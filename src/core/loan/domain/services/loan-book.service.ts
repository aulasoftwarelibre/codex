import { AvailableBook } from '@/core/book/domain/model/available-book.entity'
import { LoanId } from '@/core/common/domain/value-objects/loan-id'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { LoanFactory } from '@/core/loan/domain/model/loan.factory'
import { Loans } from '@/core/loan/domain/services/loans.repository'

export class LoanBookService {
  constructor(private readonly loans: Loans) {}

  async with(book: AvailableBook, userId: UserId): Promise<void> {
    const loanId = LoanId.generate()

    const loan = LoanFactory.create({
      bookId: book.id.value,
      id: loanId.value,
      startsAt: new Date(),
      userId: userId.value,
    })

    return this.loans.save(loan)
  }
}
