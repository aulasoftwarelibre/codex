import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Description {
  constructor(public readonly value: string) {}

  public static create(author: string): Description {
    if (!author || author.length < 3) {
      throw DomainError.cause('La descripción es demasiado corta')
    }

    return new Description(author)
  }
}
