import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Score {
  constructor(public readonly value: number) {}

  public static create(value: number): Score {
    if (!Number.isInteger(value)) {
      throw DomainError.cause('La puntuación debe ser un entero')
    }

    if (value < 1 || value > 5) {
      throw DomainError.cause('La puntuación debe ser un entero entre 1 y 5')
    }

    return new Score(value)
  }
}
