import { ok, Result } from 'neverthrow'

import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { DomainError } from '@/core/common/domain/errors/domain-error'
import { Email } from '@/core/common/domain/value-objects/email'
import { Users } from '@/core/user/domain/services/users.repository'
import { FindUserRequest } from '@/core/user/dto/requests/find-user.request'
import { UserResponse } from '@/core/user/dto/responses/user.response'

export class FindUserUseCase {
  constructor(private readonly users: Users) {}

  async with(
    command: FindUserRequest,
  ): Promise<Result<UserResponse, NotFoundError | DomainError>> {
    return Email.create(command.email)
      .asyncAndThen((email) => this.users.findByEmail(email))
      .andThen((user) =>
        ok({
          email: user.email.value,
          id: user.id.value,
          image: user.image.value,
          name: user.name.value,
          roles: user.roles.map((role) => role.value),
        } as UserResponse),
      )
  }
}
