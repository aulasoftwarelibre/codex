import cloneDeep from 'lodash.clonedeep'
import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import DuplicateIdError from '@/core/common/domain/errors/application/duplicate-id-error'
import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Publisher from '@/core/common/domain/publisher/publisher'
import BookId from '@/core/common/domain/value-objects/book-id'
import LoanId from '@/core/common/domain/value-objects/loan-id'

import Loan from '../../domain/model/loan.entity'
import Loans from '../../domain/services/loans.repository'

export default class LoansInMemory extends Publisher<Loan> implements Loans {
  public loans: Map<string, Loan> = new Map()

  constructor(loans: Loan[]) {
    super()
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
    return this.mergeObjectContext(loan).commit()
  }

  remove(id: LoanId): ResultAsync<void, NotFoundError> {
    this.loans.delete(id.value)

    return okAsync(undefined)
  }

  private clone(loan: Loan): Loan {
    return cloneDeep(loan)
  }

  protected create(instance: Loan): ResultAsync<void, ApplicationError> {
    if (this.loans.get(instance.id.value)) {
      return errAsync(DuplicateIdError.withId(instance.id))
    }

    this.loans.set(instance.id.value, instance)

    return okAsync(undefined)
  }

  protected update(
    instance: Loan,
    version: number,
  ): ResultAsync<void, ApplicationError> {
    const loan = this.loans.get(instance.id.value)
    if (!loan || loan.version !== version) {
      return errAsync(NotFoundError.withId(instance.id))
    }

    this.loans.set(instance.id.value, instance)

    return okAsync(undefined)
  }
}
