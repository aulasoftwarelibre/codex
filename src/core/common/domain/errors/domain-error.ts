import { Err, err } from 'neverthrow'

type Constructor<T> = { new (value: string): T }

export class DomainError extends Error {
  static cause<T>(this: Constructor<T>, message: string): Err<never, T> {
    return err(new this(message))
  }
}
