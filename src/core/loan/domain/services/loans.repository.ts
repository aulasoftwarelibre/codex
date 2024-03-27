import { ResultAsync } from 'neverthrow'

import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { LoanId } from '@/core/common/domain/value-objects/loan-id'
import { Loan } from '@/core/loan/domain/model/loan.entity'

export interface Loans {
  ofBook(bookId: BookId): ResultAsync<Loan, NotFoundError>
  remove(id: LoanId): ResultAsync<void, NotFoundError>
  save(loan: Loan): ResultAsync<void, ApplicationError>
}
