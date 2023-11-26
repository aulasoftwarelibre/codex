import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'

export default class BookIdAlreadyExistsError extends ApplicationError {
  static withId(id: BookId): BookIdAlreadyExistsError {
    return new BookIdAlreadyExistsError(`book with ${id.value} already exists.`)
  }
}
