import BookId from '@/core/book/domain/model/id.value-object'

export interface CreateBookResponse {
  message: string
  success: boolean
}

export interface FindBookResponse {
  authors: string[]
  id: string
  image: string
  title: string
}

export class CreateBookCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly image: string,
  ) {}
}

export class BookError extends Error {
  static becauseAlreadyExists(id: BookId) {
    return new BookError(`Book with id ${id.value} already exists`)
  }
}
