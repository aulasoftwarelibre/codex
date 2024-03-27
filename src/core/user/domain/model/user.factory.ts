import { ok, Result, safeTry } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'
import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { Image } from '@/core/common/domain/value-objects/image'
import { Roles } from '@/core/common/domain/value-objects/roles'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { User } from '@/core/user/domain/model/user.entity'
import { UserResponse } from '@/core/user/dto/responses/user.response'

export const UserFactory = {
  create: (userResponse: UserResponse): Result<User, DomainError> =>
    safeTry<User, DomainError>(function* () {
      const id = yield* UserId.create(userResponse.id)
        .mapErr((error) => error)
        .safeUnwrap()
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

      return ok(new User(id, email, roles, name, image))
    }),
}
