export default class Name {
  private constructor(public readonly value: string) {}

  static create(name: string): Name {
    const trimmedName = name.trim()

    if (!trimmedName) {
      throw new Error('Name cannot be empty')
    }

    return new Name(trimmedName)
  }
}
