import { DomainError } from '@/core/common/domain/errors/domain-error'

export class FullName {
  constructor(public readonly value: string) {}

  public static create(author: string): FullName {
    if (!author || author.length === 0) {
      throw DomainError.cause('El nombre es demasiado corto.')
    }

    if (author.length > 64) {
      throw DomainError.cause('El nombre es demasiado largo.')
    }

    return new FullName(author)
  }
}
