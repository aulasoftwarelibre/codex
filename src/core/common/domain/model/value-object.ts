export abstract class ValueObject<T> {
  protected constructor(public readonly value: T) {}

  equals(other: ValueObject<T>) {
    return (
      this.constructor.name === other.constructor.name &&
      this.value === other.value
    )
  }

  toRepresentation(): string {
    return `${this.constructor.name}(${this.value})`
  }
}
