export class BookTitle {
  constructor(public readonly value: string) {}

  public static create(title: string): BookTitle {
    if (title === undefined) {
      throw new Error('Title can not be undefined')
    }
    if (title.length < 3) {
      throw new Error('Title is too short')
    }

    return new BookTitle(title)
  }
}
