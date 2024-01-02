import { ok } from 'neverthrow'

import Email from '@/core/common/domain/value-objects/email'
import Role from '@/core/common/domain/value-objects/role'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'
import EnableUserRequest from '@/core/user/dto/requests/enable-user.request'

export default class EnableUserUseCase {
  constructor(private readonly users: Users) {}

  async with(command: EnableUserRequest) {
    return Email.create(command.email)
      .asyncAndThen((email) => this.users.findByEmail(email))
      .andThen((user) => this.enableUser(user, command.enable))
      .andThen((user) => this.users.save(user))
  }

  private enableUser(user: User, enable: boolean) {
    const memberRole = new Role('ROLE_MEMBER')
    user.roles = enable
      ? user.roles.add(memberRole)
      : user.roles.remove(memberRole)

    return ok(user)
  }
}