import { ok, Result } from 'neverthrow'

import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Email {
  constructor(public readonly value: string) {}

  public static create(email: string): Result<Email, DomainError> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRegex.test(email)) {
      return DomainError.cause('El correo no es válido.')
    }

    return ok(new Email(email))
  }
}
