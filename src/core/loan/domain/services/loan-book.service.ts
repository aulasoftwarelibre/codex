import { ResultAsync } from 'neverthrow'

import AvailableBook from '@/core/book/domain/model/available-book.entity'
import ApplicationError from '@/core/common/domain/errors/application-error'
import DomainError from '@/core/common/domain/errors/domain-error'
import LoanId from '@/core/common/domain/value-objects/loan-id'
import UserId from '@/core/common/domain/value-objects/user-id'
import LoanFactory from '@/core/loan/domain/model/loan.factory'
import Loans from '@/core/loan/domain/services/loans.repository'

export default class LoanBookService {
  constructor(private readonly loans: Loans) {}

  with(
    book: AvailableBook,
    userId: UserId,
  ): ResultAsync<void, DomainError | ApplicationError> {
    const loanId = LoanId.generate()

    return LoanFactory.create({
      bookId: book.id.value,
      id: loanId.value,
      startsAt: new Date(),
      userId: userId.value,
    }).asyncAndThen((loan) => this.loans.save(loan))
  }
}
