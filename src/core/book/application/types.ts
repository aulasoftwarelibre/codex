import BookId from '@/core/book/domain/model/id.value-object'

export class CreateBookCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly image: string,
  ) {}
}

export interface BookDTO {
  authors: string[]
  id: string
  image: string
  title: string
}

export class BookError extends Error {
  constructor(
    message: string,
    public readonly type: string,
  ) {
    super(message)
  }

  static becauseAlreadyExists(id: BookId) {
    return new BookError(
      `Book with id ${id.value} already exists`,
      'DUPLICATE_NAME',
    )
  }
}
