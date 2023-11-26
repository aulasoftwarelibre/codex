import { ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import User from '@/core/user/domain/model/user.entity'

export default interface Users {
  // Finds a user by email
  findByEmail(email: Email): ResultAsync<User, UserNotFoundError>

  // Saves a user
  save(user: User): ResultAsync<User, ApplicationError>
}
