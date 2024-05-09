import { BookFactory } from '@/core/book/domain/model/book.factory'
import { Books } from '@/core/book/domain/services/books.repository'
import { CreateBookRequest } from '@/core/book/dto/requests/create-book.request'

export class CreateBookUseCase {
  constructor(private readonly books: Books) {}

  async with(command: CreateBookRequest) {
    const book = BookFactory.create(command)

    return this.books.save(book)
  }
}
