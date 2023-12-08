import ApplicationError from '@/core/common/domain/errors/application-error'
import Id from '@/core/common/domain/value-objects/id'

export default class NotFoundError extends ApplicationError {
  static withId(id: Id): NotFoundError {
    return new NotFoundError(`Entity with ${id.toRepresentation()} not found.`)
  }
}
