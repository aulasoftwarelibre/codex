import { ResultAsync } from 'neverthrow'

import AvailableBook from '@/core/book/domain/model/available-book.entity'
import Book from '@/core/book/domain/model/book.entity'
import LoanedBook from '@/core/book/domain/model/loaned-book.entity'
import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'

export default interface Books {
  findAvailable(id: BookId): ResultAsync<AvailableBook, NotFoundError>
  findLoaned(id: BookId): ResultAsync<LoanedBook, NotFoundError>
  save(book: Book): ResultAsync<void, ApplicationError>
}
