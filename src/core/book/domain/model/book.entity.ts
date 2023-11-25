import BookImage from '@/core/book/domain/model/image.value-object'

import { BookAuthor } from './author.value-object'
import BookId from './id.value-object'
import { BookTitle } from './title.value-object'

export default class Book {
  constructor(
    private _id: BookId,
    private _title: BookTitle,
    private _authors: BookAuthor[],
    private _image: BookImage,
  ) {}

  static create(
    id: string,
    authors: string[],
    title: string,
    image: string,
  ): Book {
    const idObject = BookId.create(id)
    const titleObject = BookTitle.create(title)
    const imageObject = BookImage.create(image)
    const authorObject = authors.map((item) => BookAuthor.create(item))

    return new Book(idObject, titleObject, authorObject, imageObject)
  }

  get id(): string {
    return this._id.value
  }

  get title(): string {
    return this._title.value
  }

  get authors(): string[] {
    return this._authors.map((author) => author.value)
  }

  get image(): string {
    return this._image.value
  }
}
