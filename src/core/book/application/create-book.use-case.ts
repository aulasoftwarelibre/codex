import { errAsync } from 'neverthrow'

import BookIdAlreadyExistsError from '@/core/book/domain/errors/book-id-already-exists.error'
import Book from '@/core/book/domain/model/book.entity'
import Books from '@/core/book/domain/services/books.repository'
import BookId from '@/core/common/domain/value-objects/book-id'

import { CreateBookCommand } from './types'

export default class CreateBookUseCase {
  constructor(private readonly books: Books) {}

  async with(command: CreateBookCommand) {
    return await BookId.create(command.id)
      .asyncAndThen((bookId) => this.books.findById(bookId))
      .match(
        (book) => errAsync(BookIdAlreadyExistsError.withId(book.id)),
        () =>
          Book.create(command).asyncAndThen((_book) => this.books.save(_book)),
      )
  }
}
