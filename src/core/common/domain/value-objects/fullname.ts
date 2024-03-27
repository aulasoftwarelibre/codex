import { ok, Result } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'

export class FullName {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<FullName, DomainError> {
    if (!author || author.length === 0) {
      return DomainError.cause('El nombre es demasiado corto.')
    }

    if (author.length > 64) {
      return DomainError.cause('El nombre es demasiado largo.')
    }

    return ok(new FullName(author))
  }
}
