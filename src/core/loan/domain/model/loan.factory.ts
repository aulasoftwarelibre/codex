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
  }): Loan => {
    const loanId = LoanId.create(loan.id)
    const bookId = BookId.create(loan.bookId)
    const userId = UserId.create(loan.userId)
    const startsAt = new Date(loan.startsAt)

    return new Loan(loanId, bookId, userId, startsAt)
  },
}

export { LoanFactory }
