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

  with(command: LoanBookRequest) {
    return this.findAvailableBook(command.bookId) //
      .andThen((book) => this.loanBook(book, command.userId))
  }

  private findAvailableBook(bookId: string) {
    return BookId.create(bookId).asyncAndThen((_bookId) =>
      this.books.findAvailable(_bookId),
    )
  }

  private loanBook(book: AvailableBook, userId: string) {
    return UserId.create(userId)
      .asyncAndThen((_email) => book.loanTo(_email, this.loanBookService))
      .andThen(() => this.books.save(book))
  }
}
