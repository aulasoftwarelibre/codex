export default class Image {
  constructor(public readonly value: string) {}

  static create(name: string): Image {
    if (!name.trim()) {
      return new Image('')
    }

    try {
      new URL(name)
    } catch (error) {
      throw new Error('Invalid URL')
    }

    return new Image(name)
  }
}
