import { err, ok, Result } from 'neverthrow'
import { undefined } from 'zod'

import Role from '@/core/common/domain/value-objects/role'
import RoleError from '@/core/common/domain/value-objects/role/role.error'

export default class Roles implements Iterable<Role> {
  private readonly _roles: Role[]

  constructor(roles: Role[]) {
    this._roles = roles
  }

  static create(roles: string[]): Result<Roles, RoleError> {
    return Result.combine(roles.map((role) => Role.create(role))).match<
      Result<Roles, RoleError>
    >(
      (_roles) => ok(new Roles(_roles)),
      (_error) => err(_error),
    )
  }

  has(other: Role): boolean {
    return this._roles.some((role) => role.equals(other))
  }

  [Symbol.iterator](): Iterator<Role> {
    let index = 0

    return {
      next: (): IteratorResult<Role> => {
        return index < this._roles.length
          ? { done: false, value: this._roles[index++] }
          : { done: true, value: undefined }
      },
    }
  }

  map<T>(callback: (value: Role, index: number, array: Role[]) => T): T[] {
    return this._roles.map((element, index, array) =>
      callback(element, index, array),
    )
  }
}
