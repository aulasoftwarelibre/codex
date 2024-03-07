import cloneDeep from 'lodash.clonedeep'
import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import LoanId from '@/core/common/domain/value-objects/loan-id'

import Loan from '../../domain/model/loan.entity'
import Loans from '../../domain/services/loans.repository'

export default class LoansInMemory implements Loans {
  public loans: Map<string, Loan> = new Map()

  constructor(loans: Loan[]) {
    for (const loan of loans) {
      this.loans.set(loan.id.value, loan)
    }
  }

  ofBook(bookId: BookId): ResultAsync<Loan, NotFoundError> {
    const loan = [...this.loans.values()].find((_loan) =>
      _loan.bookId.equals(bookId),
    )

    return loan
      ? okAsync(this.clone(loan))
      : errAsync(NotFoundError.withId(bookId))
  }

  save(loan: Loan): ResultAsync<void, ApplicationError> {
    this.loans.set(loan.id.value, loan)

    return okAsync(undefined)
  }

  remove(id: LoanId): ResultAsync<void, NotFoundError> {
    this.loans.delete(id.value)

    return okAsync(undefined)
  }

  private clone(loan: Loan): Loan {
    return cloneDeep(loan)
  }
}
