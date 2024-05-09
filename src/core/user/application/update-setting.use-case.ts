import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { User } from '@/core/user/domain/model/user.entity'
import { Users } from '@/core/user/domain/services/users.repository'
import { UpdateSettingRequest } from '@/core/user/dto/requests/update-setting.request'

export class UpdateSettingUseCase {
  constructor(private readonly users: Users) {}

  async with(command: UpdateSettingRequest): Promise<void> {
    const email = Email.create(command.email)
    const user = await this.users.findByEmail(email)

    await this.users.save(this.updateUser(user, command))
  }

  private updateUser(user: User, command: UpdateSettingRequest) {
    switch (command.field) {
      case 'name': {
        return this.updateFullName(command, user)
      }
      default: {
        throw new ApplicationError(
          `Field ${command.field} does not exists in User entity`,
        )
      }
    }
  }

  private updateFullName(command: UpdateSettingRequest, user: User) {
    user.name = FullName.create(command.value)
    return user
  }
}
