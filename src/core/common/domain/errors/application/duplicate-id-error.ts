import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Id } from '@/core/common/domain/value-objects/id'

export class DuplicateIdError extends ApplicationError {
  static withId(id: Id): DuplicateIdError {
    return new DuplicateIdError(
      `Entity with ${id.toRepresentation()} already exists.`,
    )
  }
}
