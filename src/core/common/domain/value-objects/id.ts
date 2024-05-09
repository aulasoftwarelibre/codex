import { ulid } from 'ulid'

import { DomainError } from '@/core/common/domain/errors/domain-error'
import { ValueObject } from '@/core/common/domain/model/value-object'

type Constructor<T> = { new (value: string): T }

export class Id extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create<T>(this: Constructor<T>, value: string): T {
    if (!value || !/^[\dA-Za-z]{20,30}$/.test(value)) {
      throw DomainError.cause('invalid_id_format')
    }

    return new this(value)
  }

  static generate<T>(this: Constructor<T>): T {
    return new this(ulid())
  }
}
