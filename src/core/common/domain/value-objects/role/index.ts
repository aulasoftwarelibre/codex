import { err, ok, Result } from 'neverthrow'

import ValueObject from '@/core/common/domain/model/value-object'
import RoleError from '@/core/common/domain/value-objects/role/role.error'

export default class Role extends ValueObject<string> {
  constructor(public readonly value: string) {
    super(value)
  }

  static create(role: string): Result<Role, RoleError> {
    if (!role.startsWith('ROLE_')) {
      return err(RoleError.causeInvalidRole())
    }

    return ok(new Role(role))
  }
}
