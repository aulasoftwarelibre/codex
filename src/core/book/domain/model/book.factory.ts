import { ok, Result, safeTry } from 'neverthrow'

import BookDomainError from '@/core/book/domain/errors/book-domain.error'
import Book from '@/core/book/domain/model/book.entity'
import BookResponse from '@/core/book/dto/responses/book.response'
import BookId from '@/core/common/domain/value-objects/book-id'
import FullName from '@/core/common/domain/value-objects/fullname'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import Title from '@/core/common/domain/value-objects/title'

const BookFactory = {
  create: (bookResponse: BookResponse): Result<Book, BookDomainError> =>
    safeTry<Book, BookDomainError>(function* () {
      const bookId = yield* BookId.create(bookResponse.id)
        .mapErr((error) => error)
        .safeUnwrap()
      const title = yield* Title.create(bookResponse.title)
        .mapErr((error) => error)
        .safeUnwrap()
      const authors = yield* FullNames.create(bookResponse.authors)
        .mapErr((error) => error)
        .safeUnwrap()
      const image = yield* Image.create(bookResponse.image)
        .mapErr((error) => error)
        .safeUnwrap()

      return ok(new Book(bookId, title, authors, image))
    }),
  with: (bookResponse: BookResponse): Book =>
    new Book(
      new BookId(bookResponse.id),
      new Title(bookResponse.title),
      new FullNames(bookResponse.authors.map((author) => new FullName(author))),
      new Image(bookResponse.image),
    ),
}

export default BookFactory
