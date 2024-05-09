import { AvailableBook } from '@/core/book/domain/model/available-book.entity'
import { Books } from '@/core/book/domain/services/books.repository'
import { LoanBookRequest } from '@/core/book/dto/requests/loan-book.request'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { LoanBookService } from '@/core/loan/domain/services/loan-book.service'

export class LoanBookUseCase {
  constructor(
    private readonly books: Books,
    private readonly loanBookService: LoanBookService,
  ) {}

  async with(command: LoanBookRequest) {
    const book = await this.findAvailableBook(command.bookId)

    return this.loanBook(book, command.userId)
  }

  private async findAvailableBook(bookId: string) {
    const _bookId = BookId.create(bookId)

    return this.books.findAvailable(_bookId)
  }

  private async loanBook(book: AvailableBook, userId: string) {
    const _userId = UserId.create(userId)
    await book.loanTo(_userId, this.loanBookService)

    return this.books.save(book)
  }
}
