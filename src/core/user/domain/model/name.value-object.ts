export default class Name {
  constructor(public readonly value: string) {}

  static create(name: string): Name {
    if (!name.trim()) {
      return new Name('')
    }

    return new Name(name)
  }
}
