import { err, ok, Result } from 'neverthrow'
import { ulid } from 'ulid'

import ValueObject from '@/core/common/domain/model/value-object'
import IdError from '@/core/common/domain/value-objects/id/id.error'

type Constructor<T> = { new (value: string): T }

export default class Id extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static create<T>(this: Constructor<T>, value: string): Result<T, IdError> {
    if (!value || !/^[\dA-Z]{26}$/.test(value)) {
      return err(IdError.causeInvalidFormat(value))
    }

    return ok(new this(value))
  }

  static generate<T>(this: Constructor<T>): T {
    return new this(ulid())
  }
}
