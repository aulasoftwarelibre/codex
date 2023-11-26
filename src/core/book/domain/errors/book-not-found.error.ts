import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'

export default class BookNotFoundError extends ApplicationError {
  static withId(id: BookId): BookNotFoundError {
    return new BookNotFoundError(`book with ${id.value} not found`)
  }
}
