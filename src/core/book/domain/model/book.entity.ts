import BookId from '@/core/common/domain/value-objects/book-id'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import Title from '@/core/common/domain/value-objects/title'

export default class Book {
  constructor(
    private _id: BookId,
    private _title: Title,
    private _authors: FullNames,
    private _image: Image,
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
}
