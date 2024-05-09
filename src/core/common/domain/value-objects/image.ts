import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Image {
  constructor(public readonly value: string) {}

  static create(name: string): Image {
    try {
      new URL(name)
    } catch {
      throw DomainError.cause('La URL de la imagen no es válida.')
    }

    return new Image(name)
  }
}
