import { DomainError } from '@/core/common/domain/errors/domain-error'
import { ValueObject } from '@/core/common/domain/model/value-object'

export class Role extends ValueObject<string> {
  constructor(public readonly value: string) {
    super(value)
  }

  static create(role: string): Role {
    if (!role.startsWith('ROLE_')) {
      throw DomainError.cause('invalid_role_prefix')
    }

    return new Role(role)
  }
}
