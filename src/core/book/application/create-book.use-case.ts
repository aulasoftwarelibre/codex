import { err, ok, Result } from 'neverthrow'

import Book from '../domain/model/book.entity'
import BookId from '../domain/model/id.value-object'
import Books from '../domain/services/books.repository'
import { BookError, CreateBookCommand } from './types'

export default class CreateBookUseCase {
  constructor(private readonly bookRepository: Books) {}

  async with(command: CreateBookCommand): Promise<Result<true, BookError>> {
    const bookId = BookId.create(command.id)

    if (await this.bookRepository.findById(bookId)) {
      return err(BookError.becauseAlreadyExists(bookId))
    }

    const book = Book.create(
      command.id,
      command.authors,
      command.title,
      command.image,
    )

    await this.bookRepository.save(book)

    return ok(true)
  }
}
