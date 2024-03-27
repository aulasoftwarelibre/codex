import { okAsync, Result, ResultAsync } from 'neverthrow'

import { Book } from '@/core/book/domain/model/book.entity'
import { Books } from '@/core/book/domain/services/books.repository'
import { EditBookRequest } from '@/core/book/dto/requests/edit-book.request'
import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { DomainError } from '@/core/common/domain/errors/domain-error'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { FullNames } from '@/core/common/domain/value-objects/fullnames'
import { Image } from '@/core/common/domain/value-objects/image'
import { Title } from '@/core/common/domain/value-objects/title'

export class EditBookUseCase {
  constructor(private readonly books: Books) {}

  async with(command: EditBookRequest) {
    return BookId.create(command.id)
      .asyncAndThen((bookId) => this.findBook(bookId))
      .andThen((book) => this.updateBook(book, command))
  }

  private findBook(bookId: BookId): ResultAsync<Book, NotFoundError> {
    return (
      this.books.findAvailable(bookId) as ResultAsync<Book, NotFoundError>
    ).orElse(() => this.books.findLoaned(bookId))
  }

  private updateBook(
    book: Book,
    command: EditBookRequest,
  ): ResultAsync<void, DomainError | ApplicationError> {
    return Result.combine([
      Title.create(command.title),
      FullNames.create(command.authors),
      Image.create(command.image),
    ])
      .asyncAndThen(([title, authors, image]) => {
        book.title = title
        book.image = image
        book.authors = authors

        return okAsync(book)
      })
      .andThen((_book) => this.books.save(_book))
  }
}
