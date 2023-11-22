export interface CreateBookResponse {
  message: string
  success: boolean
}

export interface FindBookResponse {
  message: string
  success: boolean
}

export class CreateBookCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly image: string,
  ) {}
}
