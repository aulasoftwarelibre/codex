import { err, ok, Result } from 'neverthrow'

import {
  FindUserCommand,
  FindUserError,
  FindUserResponse,
} from '@/core/user/application/types'
import Users from '@/core/user/domain/services/users.repository'

export default class FindUserUseCase {
  constructor(private readonly userRepository: Users) {}

  async with(
    command: FindUserCommand,
  ): Promise<Result<FindUserResponse, FindUserError>> {
    const user = await this.userRepository.findByEmail(command.email)

    if (!user) {
      return err(FindUserError.causeNotFound(command.email))
    }

    return ok(new FindUserResponse(user.name, user.email))
  }
}
