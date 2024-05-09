import { LoanedBook } from '@/core/book/domain/model/loaned-book.entity'
import { Books } from '@/core/book/domain/services/books.repository'
import { ReturnBookRequest } from '@/core/book/dto/requests/return-book.request'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { ReturnBookService } from '@/core/loan/domain/services/return-book.service'

export class ReturnBookUseCase {
  constructor(
    private readonly books: Books,
    private readonly returnBookService: ReturnBookService,
  ) {}

  async with(command: ReturnBookRequest) {
    const book = await this.findLoanedBook(command.bookId) //

    return this.returnBook(book)
  }

  private async findLoanedBook(bookId: string) {
    const _bookId = BookId.create(bookId)

    return this.books.findLoaned(_bookId)
  }

  private async returnBook(book: LoanedBook) {
    await book.doAvailable(this.returnBookService)
    return this.books.save(book)
  }
}
