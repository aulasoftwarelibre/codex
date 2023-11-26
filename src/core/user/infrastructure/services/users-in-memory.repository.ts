import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'

export default class UsersInMemory implements Users {
  public users: Map<string, User> = new Map()

  findByEmail(email: Email): ResultAsync<User, UserNotFoundError> {
    const user = this.users.get(email.value)

    return user ? okAsync(user) : errAsync(UserNotFoundError.withEmail(email))
  }

  save(user: User): ResultAsync<User, ApplicationError> {
    this.users.set(user.email.value, user)

    return okAsync(user)
  }
}
