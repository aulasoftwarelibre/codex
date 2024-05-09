import { BookId } from '@/core/common/domain/value-objects/book-id'
import { LoanId } from '@/core/common/domain/value-objects/loan-id'
import { Loan } from '@/core/loan/domain/model/loan.entity'

export interface Loans {
  ofBook(bookId: BookId): Promise<Loan>
  remove(id: LoanId): Promise<void>
  save(loan: Loan): Promise<void>
}
