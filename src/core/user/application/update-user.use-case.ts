import { err, ok, Result } from 'neverthrow'

import { FindUserError, UpdateUserCommand } from '@/core/user/application/types'
import Users from '@/core/user/domain/services/users.repository'

export default class UpdateUserUseCase {
  constructor(private readonly userRepository: Users) {}

  async with(command: UpdateUserCommand): Promise<Result<true, FindUserError>> {
    const user = await this.userRepository.findByEmail(command.email)

    if (!user) {
      return err(FindUserError.causeNotFound(command.email))
    }

    user.name = command.name

    await this.userRepository.save(user)

    return ok(true)
  }
}
