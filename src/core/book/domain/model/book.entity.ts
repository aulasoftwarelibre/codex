import AggregateRoot from '@/core/common/domain/model/aggregate-root'
import BookId from '@/core/common/domain/value-objects/book-id'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import Title from '@/core/common/domain/value-objects/title'

export enum BookState {
  AVAILABLE = 'AVAILABLE',
  LOANED = 'LOANED',
}

export default abstract class Book extends AggregateRoot {
  constructor(
    protected _id: BookId,
    protected _title: Title,
    protected _authors: FullNames,
    protected _image: Image,
    protected _state: BookState = BookState.AVAILABLE,
  ) {
    super()
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

  get state(): BookState {
    return this._state
  }
}
