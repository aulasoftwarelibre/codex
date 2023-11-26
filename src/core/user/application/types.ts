export class FindUserCommand {
  constructor(public readonly email: string) {}
}

export class UpdateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly image: string,
  ) {}
}

export interface UserDTO {
  email: string
  image: string
  name: string
  roles: string[]
}
