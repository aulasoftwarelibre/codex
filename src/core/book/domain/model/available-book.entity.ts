import { Book, BookState } from '@/core/book/domain/model/book.entity'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { LoanBookService } from '@/core/loan/domain/services/loan-book.service'

export class AvailableBook extends Book {
  async loanTo(
    userId: UserId,
    loanBookService: LoanBookService,
  ): Promise<void> {
    this._state = BookState.LOANED

    return loanBookService.with(this, userId)
  }
}
