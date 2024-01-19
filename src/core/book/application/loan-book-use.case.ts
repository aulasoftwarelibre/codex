import { Result } from 'neverthrow'

import Books from '@/core/book/domain/services/books.repository'
import LoanBookRequest from '@/core/book/dto/requests/loan-book.request'
import BookId from '@/core/common/domain/value-objects/book-id'
import UserId from '@/core/common/domain/value-objects/user-id'
import LoanBookService from '@/core/loan/domain/services/loan-book.service'

export default class LoanBookUseCase {
  constructor(
    private readonly books: Books,
    private readonly loanBookService: LoanBookService,
  ) {}

  with(command: LoanBookRequest) {
    return Result.combineWithAllErrors([
      BookId.create(command.bookId),
      UserId.create(command.bookId),
    ]).asyncAndThen(([bookId, userId]) =>
      this.books
        .findAvailable(bookId)
        .andThen((book) => book.loanTo(userId, this.loanBookService))
        .andThen((book) => this.books.save(book)),
    )
  }
}
