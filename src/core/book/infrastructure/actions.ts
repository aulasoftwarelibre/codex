import container from '@/lib/container'
import { CreateBookCommand } from '../application/types'
import BookId from '../domain/model/id.value-object'
import { FindBookResponse } from '../application/types'

export async function findBooks(): Promise<FindBookResponse[]> {
  return container.findBooks.with()
}

export async function createBook(
  title: string,
  authors: string[],
  image: string,
): Promise<void> {
  const id = BookId.generate()
  await container.createBook.with(
    new CreateBookCommand(id.value, title, authors, image),
  )
}
