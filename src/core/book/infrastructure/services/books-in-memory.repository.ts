import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import BookNotFoundError from '@/core/book/domain/errors/book-not-found.error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'

import Book from '../../domain/model/book.entity'
import Books from '../../domain/services/books.repository'

export default class BooksInMemory implements Books {
  public books: Map<string, Book> = new Map()

  findAll(): ResultAsync<Book[], ApplicationError> {
    return okAsync([...this.books.values()])
  }

  findById(id: BookId): ResultAsync<Book, BookNotFoundError> {
    const book = this.books.get(id.value)

    return book ? okAsync(book) : errAsync(BookNotFoundError.withId(id))
  }

  save(book: Book): ResultAsync<Book, ApplicationError> {
    this.books.set(book.id.value, book)

    return okAsync(book)
  }
}
