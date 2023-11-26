export default class IdError extends Error {
  static causeInvalidFormat(id: string): IdError {
    return new IdError(`Id ${id} is not a valid ULID id`)
  }
}
