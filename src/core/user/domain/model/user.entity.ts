import Email from '@/core/user/domain/model/email.value-object'
import Image from '@/core/user/domain/model/image.value-object'
import Name from '@/core/user/domain/model/name.value-object'
import Role from '@/core/user/domain/model/role.value-object'
import gravatar from '@/lib/utils/gravatar'

export default class User {
  constructor(
    private _name: Name,
    private _roles: Role[],
    private _email: Email,
    private _image: Image,
  ) {}

  static create(
    name: string,
    roles: string[],
    email: string,
    image: string,
  ): User {
    const nameObj = Name.create(name)
    const roleObjs = roles.map(Role.create)
    const emailObj = Email.create(email)
    const imageObj = Image.create(image || gravatar(email))

    return new User(nameObj, roleObjs, emailObj, imageObj)
  }

  get name(): string {
    return this._name.value
  }

  set name(name: string) {
    this._name = Name.create(name)
  }

  get roles(): string[] {
    return this._roles.map((role) => role.value)
  }

  get email(): string {
    return this._email.value
  }

  get image(): string {
    return this._image.value
  }
}
