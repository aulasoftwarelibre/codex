import { err, ok, Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'
import Email from '@/core/common/domain/value-objects/email'
import FullName from '@/core/common/domain/value-objects/fullname'
import Image from '@/core/common/domain/value-objects/image'
import Roles from '@/core/common/domain/value-objects/roles'
import gravatar from '@/lib/utils/gravatar'

export default class User {
  constructor(
    private _email: Email,
    private _roles: Roles,
    private _name: FullName,
    private _image: Image,
  ) {}

  static create(
    email: string,
    roles: string[],
    name: string,
    image?: string,
  ): Result<User, DomainError> {
    return Result.combine([
      FullName.create(name),
      Email.create(email),
      Image.create(image || gravatar(email)),
      Roles.create(roles),
    ]).match<Result<User, DomainError>>(
      ([_fullName, _email, _image, _roles]) => {
        return ok(new User(_email, _roles, _fullName, _image))
      },
      (error) => {
        return err(error)
      },
    )
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
