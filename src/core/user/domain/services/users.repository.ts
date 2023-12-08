import { ResultAsync } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'
import User from '@/core/user/domain/model/user.entity'

export default interface Users {
  findByEmail(email: Email): ResultAsync<User, NotFoundError>
  save(user: User): ResultAsync<void, ApplicationError>
}
