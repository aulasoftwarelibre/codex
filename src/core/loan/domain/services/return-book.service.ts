import { ResultAsync } from 'neverthrow'

import LoanedBook from '@/core/book/domain/model/loaned-book.entity'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Loan from '@/core/loan/domain/model/loan.entity'
import Loans from '@/core/loan/domain/services/loans.repository'

export default class ReturnBookService {
  constructor(private readonly loans: Loans) {}

  with(book: LoanedBook): ResultAsync<void, ApplicationError> {
    return this.loans.ofBook(book.id).andThen((loan) => this.returnBook(loan))
  }

  private returnBook(loan: Loan) {
    return this.loans.remove(loan.id)
  }
}
