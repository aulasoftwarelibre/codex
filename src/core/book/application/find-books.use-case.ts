import Books from '@/core/book/domain/services/books.repository'

import { BookDTO } from './types'

export default class FindBooksUseCase {
  constructor(private readonly booksRepository: Books) {}

  async with(): Promise<BookDTO[]> {
    const books = await this.booksRepository.findAll()

    return books.map((book) => ({
      authors: book.authors,
      id: book.id,
      image: book.image,
      title: book.title,
    }))
  }
}
