import { ok, Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'

export default class Title {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<Title, DomainError> {
    return ok(new Title(author))
  }
}
