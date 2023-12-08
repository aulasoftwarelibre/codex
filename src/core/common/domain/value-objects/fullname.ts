import { ok, Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'

export default class FullName {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<FullName, DomainError> {
    if (!author || author.length < 3) {
      return DomainError.cause('El nombre es demasiado corto.')
    }

    return ok(new FullName(author))
  }
}
