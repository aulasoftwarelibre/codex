import Books from '@/core/book/domain/services/books.repository'

import { FindBookResponse } from './types'

export default class FindBooksUseCase {
  constructor(private readonly booksRepository: Books) {}

  async with(): Promise<FindBookResponse[]> {
    const books = await this.booksRepository.findAll()

    return books.map((book) => ({
      authors: book.authors,
      id: book.id,
      image: book.image,
      title: book.title,
    }))
  }
}