import { DomainError } from '@/core/common/domain/errors/domain-error'

export class Email {
  constructor(public readonly value: string) {}

  public static create(email: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRegex.test(email)) {
      throw DomainError.cause('El correo no es válido.')
    }

    return new Email(email)
  }
}
