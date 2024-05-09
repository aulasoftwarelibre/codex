type Constructor<T> = { new (value: string): T }

export class DomainError extends Error {
  static cause<T>(this: Constructor<T>, message: string): T {
    return new this(message)
  }
}
