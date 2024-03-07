import { Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'

export default class FullName {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<FullName, DomainError> {}
}
