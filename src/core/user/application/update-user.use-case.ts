import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { User } from '@/core/user/domain/model/user.entity'
import { Users } from '@/core/user/domain/services/users.repository'
import { UpdateUserRequest } from '@/core/user/dto/requests/update-user.request'

export class UpdateUserUseCase {
  constructor(private readonly users: Users) {}

  async with(command: UpdateUserRequest): Promise<void> {
    const email = Email.create(command.email)
    const user = await this.users.findByEmail(email)

    await this.users.save(this.updateUser(user, command))
  }

  private updateUser(user: User, command: UpdateUserRequest) {
    user.name = FullName.create(command.name)

    return user
  }
}
