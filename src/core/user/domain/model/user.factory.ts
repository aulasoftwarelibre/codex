import { ok, Result, safeTry } from 'neverthrow'

import Email from '@/core/common/domain/value-objects/email'
import FullName from '@/core/common/domain/value-objects/fullname'
import Image from '@/core/common/domain/value-objects/image'
import Role from '@/core/common/domain/value-objects/role'
import Roles from '@/core/common/domain/value-objects/roles'
import UserDomainError from '@/core/user/domain/errors/user-domain.error'
import User from '@/core/user/domain/model/user.entity'
import UserResponse from '@/core/user/dto/responses/user.response'

const UserFactory = {
  create: (userResponse: UserResponse): Result<User, UserDomainError> =>
    safeTry<User, UserDomainError>(function* () {
      const email = yield* Email.create(userResponse.email)
        .mapErr((error) => error)
        .safeUnwrap()
      const roles = yield* Roles.create(userResponse.roles)
        .mapErr((error) => error)
        .safeUnwrap()
      const name = yield* FullName.create(userResponse.name)
        .mapErr((error) => error)
        .safeUnwrap()
      const image = yield* Image.create(userResponse.image)
        .mapErr((error) => error)
        .safeUnwrap()

      return ok(new User(email, roles, name, image))
    }),
  with: (userResponse: UserResponse): User =>
    new User(
      new Email(userResponse.email),
      new Roles(userResponse.roles.map((role) => new Role(role))),
      new FullName(userResponse.name),
      new Image(userResponse.image),
    ),
}

export default UserFactory
