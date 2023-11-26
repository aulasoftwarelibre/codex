import { ok, Result } from 'neverthrow'

import Email from '@/core/common/domain/value-objects/email'
import EmailError from '@/core/common/domain/value-objects/email/email.error'
import { FindUserCommand, UserDTO } from '@/core/user/application/types'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import Users from '@/core/user/domain/services/users.repository'

export default class FindUserUseCase {
  constructor(private readonly userRepository: Users) {}

  async with(
    command: FindUserCommand,
  ): Promise<Result<UserDTO, UserNotFoundError | EmailError>> {
    return Email.create(command.email)
      .asyncAndThen((email) => this.userRepository.findByEmail(email))
      .andThen((user) =>
        ok({
          email: user.email.value,
          image: user.image.value,
          name: user.name.value,
          roles: user.roles.map((role) => role.value),
        } as UserDTO),
      )
  }
}
