import { LoanedBook } from '@/core/book/domain/model/loaned-book.entity'
import { Loan } from '@/core/loan/domain/model/loan.entity'
import { Loans } from '@/core/loan/domain/services/loans.repository'

export class ReturnBookService {
  constructor(private readonly loans: Loans) {}

  async with(book: LoanedBook): Promise<void> {
    const loan = await this.loans.ofBook(book.id)

    return this.returnBook(loan)
  }

  private returnBook(loan: Loan) {
    return this.loans.remove(loan.id)
  }
}
