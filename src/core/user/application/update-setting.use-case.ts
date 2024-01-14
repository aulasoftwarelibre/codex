import { err, ok, Result } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import DomainError from '@/core/common/domain/errors/domain-error'
import Email from '@/core/common/domain/value-objects/email'
import FullName from '@/core/common/domain/value-objects/fullname'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'
import UpdateSettingRequest from '@/core/user/dto/requests/update-setting.request'

export default class UpdateSettingUseCase {
  constructor(private readonly users: Users) {}

  async with(
    command: UpdateSettingRequest,
  ): Promise<Result<void, NotFoundError | DomainError>> {
    return Email.create(command.email)
      .asyncAndThen((email) => this.users.findByEmail(email))
      .andThen((user) => this.updateUser(user, command))
      .andThen((user) => this.users.save(user))
  }

  private updateUser(user: User, command: UpdateSettingRequest) {
    switch (command.field) {
      case 'name': {
        return this.updateFullName(command, user)
      }
      default: {
        return err(
          new ApplicationError(
            `Field ${command.field} does not exists in User entity`,
          ),
        )
      }
    }
  }

  private updateFullName(command: UpdateSettingRequest, user: User) {
    return FullName.create(command.value).andThen((fullName) => {
      user.name = fullName

      return ok(user)
    })
  }
}
