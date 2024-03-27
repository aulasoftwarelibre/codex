import { ok, Result } from 'neverthrow'

import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { DomainError } from '@/core/common/domain/errors/domain-error'
import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { User } from '@/core/user/domain/model/user.entity'
import { Users } from '@/core/user/domain/services/users.repository'
import { UpdateUserRequest } from '@/core/user/dto/requests/update-user.request'

export class UpdateUserUseCase {
  constructor(private readonly users: Users) {}

  async with(
    command: UpdateUserRequest,
  ): Promise<Result<void, NotFoundError | DomainError>> {
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
