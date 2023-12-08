import cloneDeep from 'lodash.clonedeep'
import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import DuplicateIdError from '@/core/common/domain/errors/application/duplicate-id-error'
import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Publisher from '@/core/common/domain/publisher/publisher'
import Email from '@/core/common/domain/value-objects/email'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'

export default class UsersInMemory extends Publisher<User> implements Users {
  public users: Map<string, User> = new Map()

  constructor(users: User[]) {
    super()
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
    return this.mergeObjectContext(user).commit()
  }

  private clone(user: User): User {
    return cloneDeep(user)
  }

  protected create(instance: User): ResultAsync<void, ApplicationError> {
    if (this.users.get(instance.id.value)) {
      return errAsync(DuplicateIdError.withId(instance.id))
    }

    this.users.set(instance.id.value, instance)

    return okAsync(undefined)
  }

  protected update(
    instance: User,
    version: number,
  ): ResultAsync<void, ApplicationError> {
    const user = this.users.get(instance.id.value)
    if (!user || user.version !== version) {
      return errAsync(NotFoundError.withId(instance.id))
    }

    this.users.set(instance.id.value, instance)

    return okAsync(undefined)
  }
}
