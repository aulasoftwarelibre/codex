import { ok, Result } from 'neverthrow'

import Email from '@/core/common/domain/value-objects/email'
import EmailError from '@/core/common/domain/value-objects/email/email.error'
import FullName from '@/core/common/domain/value-objects/fullname'
import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'
import UpdateUserRequest from '@/core/user/dto/requests/update-user.request'

export default class UpdateUserUseCase {
  constructor(private readonly users: Users) {}

  async with(
    command: UpdateUserRequest,
  ): Promise<Result<User, UserNotFoundError | EmailError | FullNameError>> {
    return Email.create(command.email)
      .asyncAndThen((email) => this.users.findByEmail(email))
      .andThen((user) => this.updateUser(user, command))
      .andThen((user) => this.users.save(user))
  }

  private updateUser(user: User, command: UpdateUserRequest) {
    return FullName.create(command.name).andThen((fullName) => {
      user.name = fullName

      return ok(user)
    })
  }
}
