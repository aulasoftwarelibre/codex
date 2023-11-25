export default class BookImage {
  constructor(public readonly value: string) {}

  static create(name: string): BookImage {
    if (!name.trim()) {
      return new BookImage('')
    }

    try {
      new URL(name)
    } catch {
      throw new Error('Invalid URL')
    }

    return new BookImage(name)
  }
}
