import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Title {
  constructor(public readonly value: string) {}

  public static create(author: string): Title {
    if (!author || author.length < 3) {
      throw DomainError.cause('El título es demasiado corto')
    }

    return new Title(author)
  }
}
