import { ok, Result } from 'neverthrow'
import { ulid } from 'ulid'

import DomainError from '@/core/common/domain/errors/domain-error'
import ValueObject from '@/core/common/domain/model/value-object'

type Constructor<T> = { new (value: string): T }

export default class Id extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create<T>(
    this: Constructor<T>,
    value: string,
  ): Result<T, DomainError> {
    if (!value || !/^[\dA-Za-z]{20,30}$/.test(value)) {
      return DomainError.cause('invalid_id_format')
    }

    return ok(new this(value))
  }

  static generate<T>(this: Constructor<T>): T {
    return new this(ulid())
  }
}
