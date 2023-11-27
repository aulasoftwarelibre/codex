import { errAsync } from 'neverthrow'

import BookIdAlreadyExistsError from '@/core/book/domain/errors/book-id-already-exists.error'
import BookFactory from '@/core/book/domain/model/book.factory'
import Books from '@/core/book/domain/services/books.repository'
import CreateBookRequest from '@/core/book/dto/requests/create-book.request'
import BookId from '@/core/common/domain/value-objects/book-id'

export default class CreateBookUseCase {
  constructor(private readonly books: Books) {}

  async with(command: CreateBookRequest) {
    return await BookId.create(command.id)
      .asyncAndThen((bookId) => this.books.findById(bookId))
      .match(
        (book) => errAsync(BookIdAlreadyExistsError.withId(book.id)),
        () =>
          BookFactory.create(command).asyncAndThen((_book) =>
            this.books.save(_book),
          ),
      )
  }
}
