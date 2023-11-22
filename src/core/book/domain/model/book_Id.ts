import { v4 as uuid } from 'uuid'

export default class BookId {
  constructor(public readonly value: string) {}

  static generate(): BookId {
    return new BookId(uuid())
  }

  public static with(id: string): BookId {
    return new BookId(id)
  }
}
