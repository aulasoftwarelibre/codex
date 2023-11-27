import Email from '@/core/common/domain/value-objects/email'
import FullName from '@/core/common/domain/value-objects/fullname'
import Image from '@/core/common/domain/value-objects/image'
import Roles from '@/core/common/domain/value-objects/roles'

export default class User {
  constructor(
    private _email: Email,
    private _roles: Roles,
    private _name: FullName,
    private _image: Image,
  ) {}

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
