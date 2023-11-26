import { ok, Result, safeTry } from 'neverthrow'

import { BookDTO } from '@/core/book/application/types'
import DomainError from '@/core/common/domain/errors/domain-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import IdError from '@/core/common/domain/value-objects/id/id.error'
import Image from '@/core/common/domain/value-objects/image'
import ImageError from '@/core/common/domain/value-objects/image/image.error'
import Title from '@/core/common/domain/value-objects/title'
import TitleError from '@/core/common/domain/value-objects/title/title.error'

export default class Book {
  constructor(
    private _id: BookId,
    private _title: Title,
    private _authors: FullNames,
    private _image: Image,
  ) {}

  static create(
    bookDTO: BookDTO,
  ): Result<Book, IdError | TitleError | FullNameError | ImageError> {
    return safeTry<Book, DomainError>(function* () {
      const bookId = yield* BookId.create(bookDTO.id)
        .mapErr((error) => error)
        .safeUnwrap()
      const title = yield* Title.create(bookDTO.title)
        .mapErr((error) => error)
        .safeUnwrap()
      const authors = yield* FullNames.create(bookDTO.authors)
        .mapErr((error) => error)
        .safeUnwrap()
      const image = yield* Image.create(bookDTO.image)
        .mapErr((error) => error)
        .safeUnwrap()

      return ok(new Book(bookId, title, authors, image))
    })
  }

  get id(): BookId {
    return this._id
  }

  get title(): Title {
    return this._title
  }

  get authors(): FullNames {
    return this._authors
  }

  get image(): Image {
    return this._image
  }
}
