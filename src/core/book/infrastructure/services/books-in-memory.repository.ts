import cloneDeep from 'lodash.clonedeep'
import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import AvailableBook from '@/core/book/domain/model/available-book.entity'
import Book, { BookState } from '@/core/book/domain/model/book.entity'
import LoanedBook from '@/core/book/domain/model/loaned-book.entity'
import Books from '@/core/book/domain/services/books.repository'
import DuplicateIdError from '@/core/common/domain/errors/application/duplicate-id-error'
import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Publisher from '@/core/common/domain/publisher/publisher'
import BookId from '@/core/common/domain/value-objects/book-id'

export default class BooksInMemory extends Publisher<Book> implements Books {
  public books: Map<string, Book> = new Map()

  constructor(books: Book[] = []) {
    super()
    for (const book of books) {
      this.books.set(book.id.value, book)
    }
  }

  findAvailable(id: BookId): ResultAsync<AvailableBook, NotFoundError> {
    return this.ofId(id, BookState.AVAILABLE) as ResultAsync<
      AvailableBook,
      NotFoundError
    >
  }

  findLoaned(id: BookId): ResultAsync<LoanedBook, NotFoundError> {
    return this.ofId(id, BookState.LOANED) as ResultAsync<
      LoanedBook,
      NotFoundError
    >
  }

  ofId(id: BookId, state: BookState): ResultAsync<Book, NotFoundError> {
    const book = this.books.get(id.value)

    return book && book.state === state
      ? okAsync(this.clone(book))
      : errAsync(NotFoundError.withId(id))
  }

  save(book: Book): ResultAsync<void, ApplicationError> {
    return this.mergeObjectContext(book).commit()
  }

  private clone(book: Book): Book {
    return cloneDeep(book)
  }

  protected create(instance: Book): ResultAsync<void, ApplicationError> {
    if (this.books.get(instance.id.value)) {
      return errAsync(DuplicateIdError.withId(instance.id))
    }

    this.books.set(instance.id.value, instance)

    return okAsync(undefined)
  }

  protected update(
    instance: Book,
    version: number,
  ): ResultAsync<void, ApplicationError> {
    const book = this.books.get(instance.id.value)
    if (!book || book.version !== version) {
      return errAsync(NotFoundError.withId(instance.id))
    }

    this.books.set(instance.id.value, instance)

    return okAsync(undefined)
  }
}
