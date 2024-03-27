import { ok, Result, safeTry } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { LoanId } from '@/core/common/domain/value-objects/loan-id'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { Loan } from '@/core/loan/domain/model/loan.entity'

const LoanFactory = {
  create: (loan: {
    bookId: string
    id: string
    startsAt: Date
    userId: string
  }): Result<Loan, DomainError> =>
    safeTry<Loan, DomainError>(function* () {
      const loanId = yield* LoanId.create(loan.id)
        .mapErr((error) => error)
        .safeUnwrap()
      const bookId = yield* BookId.create(loan.bookId)
        .mapErr((error) => error)
        .safeUnwrap()
      const userId = yield* UserId.create(loan.userId)
        .mapErr((error) => error)
        .safeUnwrap()
      const startsAt = new Date(loan.startsAt)

      return ok(new Loan(loanId, bookId, userId, startsAt))
    }),
}

export { LoanFactory }
