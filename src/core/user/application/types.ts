export class FindUserCommand {
  constructor(public readonly email: string) {}
}

export class FindUserResponse {
  constructor(
    public readonly name: string | null,
    public readonly email: string | null,
  ) {}
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
  ) {}
}
