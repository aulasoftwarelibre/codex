import { ok, Result } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Title {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<Title, DomainError> {
    if (!author || author.length < 3) {
      return DomainError.cause('El título es demasiado corto')
    }

    return ok(new Title(author))
  }
}
