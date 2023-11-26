import { ok, Result, safeTry } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'
import Email from '@/core/common/domain/value-objects/email'
import EmailError from '@/core/common/domain/value-objects/email/email.error'
import FullName from '@/core/common/domain/value-objects/fullname'
import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'
import Image from '@/core/common/domain/value-objects/image'
import ImageError from '@/core/common/domain/value-objects/image/image.error'
import RoleError from '@/core/common/domain/value-objects/role/role.error'
import Roles from '@/core/common/domain/value-objects/roles'
import { UserDTO } from '@/core/user/application/types'

export default class User {
  constructor(
    private _email: Email,
    private _roles: Roles,
    private _name: FullName,
    private _image: Image,
  ) {}

  static create(
    userDTO: UserDTO,
  ): Result<User, EmailError | RoleError | FullNameError | ImageError> {
    return safeTry<User, DomainError>(function* () {
      const email = yield* Email.create(userDTO.email)
        .mapErr((error) => error)
        .safeUnwrap()
      const roles = yield* Roles.create(userDTO.roles)
        .mapErr((error) => error)
        .safeUnwrap()
      const name = yield* FullName.create(userDTO.name)
        .mapErr((error) => error)
        .safeUnwrap()
      const image = yield* Image.create(userDTO.image)
        .mapErr((error) => error)
        .safeUnwrap()

      return ok(new User(email, roles, name, image))
    })
  }

  get name(): FullName {
    return this._name
  }

  set name(fullName: FullName) {
    this._name = fullName
  }

  get email(): Email {
    return this._email
  }

  get roles(): Roles {
    return this._roles
  }

  get image(): Image {
    return this._image
  }
}
