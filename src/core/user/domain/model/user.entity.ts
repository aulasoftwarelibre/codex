import { AggregateRoot } from '@/core/common/domain/model/aggregate-root'
import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { Image } from '@/core/common/domain/value-objects/image'
import { Roles } from '@/core/common/domain/value-objects/roles'
import { UserId } from '@/core/common/domain/value-objects/user-id'

export class User extends AggregateRoot {
  constructor(
    private _id: UserId,
    private _email: Email,
    private _roles: Roles,
    private _name: FullName,
    private _image: Image,
  ) {
    super()
  }

  get id(): UserId {
    return this._id
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

  set roles(roles: Roles) {
    this._roles = roles
  }

  get image(): Image {
    return this._image
  }
}
