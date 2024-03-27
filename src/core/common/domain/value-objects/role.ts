import { ok, Result } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'
import { ValueObject } from '@/core/common/domain/model/value-object'

export class Role extends ValueObject<string> {
  constructor(public readonly value: string) {
    super(value)
  }

  static create(role: string): Result<Role, DomainError> {
    if (!role.startsWith('ROLE_')) {
      return DomainError.cause('invalid_role_prefix')
    }

    return ok(new Role(role))
  }
}
