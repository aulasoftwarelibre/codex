export class FindUserCommand {
  constructor(public readonly email: string) {}
}

export interface FindUserResponse {
  email: string | null
  image: string | null
  name: string | null
  roles: string[]
}

export class FindUserError extends Error {
  static causeNotFound(email: string) {
    return new FindUserError(`User ${email} not found`)
  }
}

export class UpdateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly image: string,
  ) {}
}
