import { ok, Result } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Image {
  constructor(public readonly value: string) {}

  static create(name: string): Result<Image, DomainError> {
    try {
      new URL(name)
    } catch {
      return DomainError.cause('La URL de la imagen no es válida.')
    }

    return ok(new Image(name))
  }
}
