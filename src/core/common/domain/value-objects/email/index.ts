import { err, ok, Result } from 'neverthrow'

import EmailError from '@/core/common/domain/value-objects/email/email.error'

export default class Email {
  constructor(public readonly value: string) {}

  public static create(email: string): Result<Email, EmailError> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRegex.test(email)) {
      return err(EmailError.causeInvalidEmail())
    }

    return ok(new Email(email))
  }
}
