import { createId } from '@paralleldrive/cuid2'

export default class BookId {
  constructor(public readonly value: string) {}

  static generate(): BookId {
    return new BookId(createId())
  }

  public static create(id: string): BookId {
    return new BookId(id)
  }
}
