import cloneDeep from 'lodash.clonedeep'
import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'

export default class UsersInMemory implements Users {
  public users: Map<string, User> = new Map()

  constructor(users: User[]) {
    for (const user of users) {
      this.users.set(user.id.value, user)
    }
  }

  findByEmail(email: Email): ResultAsync<User, NotFoundError> {
    const user = [...this.users.values()].find(
      (_user) => _user.email.value === email.value,
    )

    return user
      ? okAsync(this.clone(user))
      : errAsync(new NotFoundError('user_email_not_found'))
  }

  save(user: User): ResultAsync<void, ApplicationError> {
    this.users.set(user.id.value, this.clone(user))

    return okAsync(undefined)
  }

  private clone(user: User): User {
    return cloneDeep(user)
  }
}
