import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'

export default class UserNotFoundError extends ApplicationError {
  static withEmail(email: Email): UserNotFoundError {
    return new UserNotFoundError(`User with ${email.value} not found`)
  }
}
