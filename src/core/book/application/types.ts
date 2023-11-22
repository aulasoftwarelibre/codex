export interface FindBookResponse {
  authors: string[]
  id: string
  image: string
  title: string
}
export class FindBooksCommand {
  constructor() {}
}
