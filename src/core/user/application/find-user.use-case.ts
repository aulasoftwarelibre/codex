import { ok, Result } from 'neverthrow'

import Email from '@/core/common/domain/value-objects/email'
import EmailError from '@/core/common/domain/value-objects/email/email.error'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import Users from '@/core/user/domain/services/users.repository'
import FindUserRequest from '@/core/user/dto/requests/find-user.request'
import UserResponse from '@/core/user/dto/responses/user.response'

export default class FindUserUseCase {
  constructor(private readonly users: Users) {}

  async with(
    command: FindUserRequest,
  ): Promise<Result<UserResponse, UserNotFoundError | EmailError>> {
    return Email.create(command.email)
      .asyncAndThen((email) => this.users.findByEmail(email))
      .andThen((user) =>
        ok({
          email: user.email.value,
          image: user.image.value,
          name: user.name.value,
          roles: user.roles.map((role) => role.value),
        } as UserResponse),
      )
  }
}
