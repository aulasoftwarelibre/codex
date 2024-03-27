import { err, ok, Result } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'
import { Role } from '@/core/common/domain/value-objects/role'

export class Roles {
  private readonly _roles: Role[]

  constructor(roles: Role[]) {
    this._roles = roles
  }

  static create(
    roles: string[] | readonly string[],
  ): Result<Roles, DomainError> {
    return Result.combine(roles.map((role) => Role.create(role))).match<
      Result<Roles, DomainError>
    >(
      (_roles) => ok(new Roles(_roles)),
      (_error) => err(_error),
    )
  }

  add(other: Role): Roles {
    if (this.has(other)) {
      return this
    }

    return new Roles([...this._roles, other])
  }

  remove(other: Role): Roles {
    if (!this.has(other)) {
      return this
    }

    return new Roles(this._roles.filter((role) => !role.equals(other)))
  }

  has(other: Role): boolean {
    return this._roles.some((role) => role.equals(other))
  }

  map<T>(callback: (value: Role, index: number, array: Role[]) => T): T[] {
    return this._roles.map((element, index, array) =>
      callback(element, index, array),
    )
  }
}
