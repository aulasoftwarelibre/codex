export interface FindBookResponse {
  authors: string[]
  id: string
  image: string
  title: string
}

export class CreateBookCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly image: string,
  ) {}
}