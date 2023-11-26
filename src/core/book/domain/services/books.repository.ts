import { ResultAsync } from 'neverthrow'

import BookNotFoundError from '@/core/book/domain/errors/book-not-found.error'
import Book from '@/core/book/domain/model/book.entity'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'

export default interface Books {
  findAll(): ResultAsync<Book[], ApplicationError>
  findById(id: BookId): ResultAsync<Book, BookNotFoundError>
  save(book: Book): ResultAsync<Book, ApplicationError>
}
