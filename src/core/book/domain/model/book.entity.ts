import { err, ok, Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import Email from '@/core/common/domain/value-objects/email'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import Title from '@/core/common/domain/value-objects/title'

import Loans from '../services/loans.service'

export default class Book {
  constructor(
    private _id: BookId,
    private _title: Title,
    private _authors: FullNames,
    private _image: Image,
    private _loanedBy: Email | undefined,
  ) {}

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

  get isLoaned(): boolean {
    return this._loanedBy !== undefined
  }

  loanTo(email: Email, loans: Loans): Result<Book, DomainError> {
    if (this.isLoaned) return err(new DomainError('Book already loaned'))
    loans.create(this.id, email)

    return ok(new Book(this.id, this.title, this.authors, this.image, email))
  }
}
