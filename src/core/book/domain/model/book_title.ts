export class BookTitle {
  constructor(public readonly value: string) {}

  public static with(title: string): BookTitle {
    if (title === undefined) {
      throw Error('Title can not be undefined')
    }
    if (title.length < 3) {
      throw Error('Title is too short')
    }

    return new BookTitle(title)
  }
}
