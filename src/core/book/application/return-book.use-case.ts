import LoanedBook from '@/core/book/domain/model/loaned-book.entity'
import Books from '@/core/book/domain/services/books.repository'
import ReturnBookRequest from '@/core/book/dto/requests/return-book.request'
import BookId from '@/core/common/domain/value-objects/book-id'
import ReturnBookService from '@/core/loan/domain/services/return-book.service'

export default class ReturnBookUseCase {
  constructor(
    private readonly books: Books,
    private readonly returnBookService: ReturnBookService,
  ) {}

  with(command: ReturnBookRequest) {
    return this.findLoanedBook(command.bookId).andThen((book) =>
      this.returnBook(book),
    )
  }

  private findLoanedBook(bookId: string) {
    return BookId.create(bookId).asyncAndThen((_bookId) =>
      this.books.findLoaned(_bookId),
    )
  }

  private returnBook(book: LoanedBook) {
    return book
      .doAvailable(this.returnBookService)
      .andThen(() => this.books.save(book))
  }
}
