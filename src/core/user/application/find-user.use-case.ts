import { Email } from '@/core/common/domain/value-objects/email'
import { Users } from '@/core/user/domain/services/users.repository'
import { FindUserRequest } from '@/core/user/dto/requests/find-user.request'
import { UserResponse } from '@/core/user/dto/responses/user.response'

export class FindUserUseCase {
  constructor(private readonly users: Users) {}

  async with(command: FindUserRequest): Promise<UserResponse> {
    const email = Email.create(command.email)
    const user = await this.users.findByEmail(email)

    return {
      email: user.email.value,
      id: user.id.value,
      image: user.image.value,
      name: user.name.value,
      roles: user.roles.map((role) => role.value),
    } as UserResponse
  }
}
