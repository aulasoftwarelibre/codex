import { errAsync } from 'neverthrow'

import Books from '@/core/book/domain/services/books.repository'
import LoanBookRequest from '@/core/book/dto/requests/loan-book.request'
import BookId from '@/core/common/domain/value-objects/book-id'
import Email from '@/core/common/domain/value-objects/email'
import EmailError from '@/core/common/domain/value-objects/email/email.error'

import BookNotFoundError from '../domain/errors/book-not-found.error'
import Loans from '../domain/services/loans.service'

export default class LoanBookUseCase {
  constructor(
    private readonly books: Books,
    private readonly loans: Loans,
  ) {}

  async with(command: LoanBookRequest) {
    return await BookId.create(command.bookId)
      .asyncAndThen((bookId) => this.books.findById(bookId))
      .match(
        (book) =>
          Email.create(command.userMail).match(
            (email) =>
              book.loanTo(email, this.loans).match(
                (_book) => this.books.save(_book),
                (error) => errAsync(error),
              ),
            () => errAsync(EmailError.causeInvalidEmail()),
          ),
        () => errAsync(BookNotFoundError.withString(command.bookId)),
      )
  }
}
