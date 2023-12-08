import { ok, Result, safeTry } from 'neverthrow'

import AvailableBook from '@/core/book/domain/model/available-book.entity'
import BookResponse from '@/core/book/dto/responses/book.response'
import DomainError from '@/core/common/domain/errors/domain-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import Title from '@/core/common/domain/value-objects/title'

const BookFactory = {
  create: (bookResponse: BookResponse): Result<AvailableBook, DomainError> =>
    safeTry<AvailableBook, DomainError>(function* () {
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

      return ok(new AvailableBook(bookId, title, authors, image))
    }),
}

export default BookFactory
