export default class Email {
  constructor(public readonly value: string) {}

  static create(email: string): Email {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim() || !emailRegex.test(email)) {
      throw new Error('Invalid email address')
    }

    return new Email(email)
  }
}
