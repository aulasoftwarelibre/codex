export class BookAuthor {
  constructor(public readonly value: string) {}

  public static create(author: string): BookAuthor {
    if (author === undefined) {
      throw Error('Author can not be undefined')
    }
    if (author.length < 3) {
      throw Error('Author is too short')
    }

    return new BookAuthor(author)
  }
}
