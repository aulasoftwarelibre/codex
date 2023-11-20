import Email from '@/core/user/domain/model/email.value-object'
import Name from '@/core/user/domain/model/name.value-object'
import Role from '@/core/user/domain/model/role.value-object'

export default class User {
  constructor(
    private _name: Name,
    private _roles: Role[],
    private _email: Email,
  ) {}

  static create(name: string, roles: string[], email: string): User {
    const nameObj = Name.create(name)
    const roleObjs = roles.map(Role.create)
    const emailObj = Email.create(email)

    return new User(nameObj, roleObjs, emailObj)
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

  addRole(role: string): void {
    const roleObj = Role.create(role)
    this._roles.push(roleObj)
  }
}
