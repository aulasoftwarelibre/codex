import Image from '@/core/book/domain/model/image.value-object'
import Tittle from '@/core/book/domain/model/tittle.value-object'

export default class Book {
  constructor(
    private _id: string,
    private _tittle: Tittle,
    private _authors: string[],
    private _image: Image,
  ) {}

  static create(
    id: string,
    authors: string[],
    tittle: string,
    image: string,
  ): Book {
    const tittleObj = Tittle.create(tittle)
    const imageObj = Image.create(image)

    return new Book(id, tittleObj, authors, imageObj)
  }

  get id(): string {
    return this._id
  }

  get tittle(): string {
    return this._tittle.value
  }

  set tittle(tittle: string) {
    this._tittle = Tittle.create(tittle)
  }

  get authors(): string[] {
    return this._authors.map((author) => author)
  }

  get image(): string {
    return this._image.value
  }
}
