import { DeepReadonly } from 'ts-essentials'

import Book from '@/core/book/domain/model/book.entity'

type CreateBookCommand = DeepReadonly<{
  authors: string[]
  id: string
  image: string
  title: string
}>

const CreateBookCommand = {
  with: (properties: CreateBookCommand) => properties,
}

type BookDTO = DeepReadonly<{
  authors: string[]
  id: string
  image: string
  title: string
}>

const BookDTO = {
  fromModel: (book: Book): BookDTO => ({
    authors: book.authors.map((author) => author.value),
    id: book.id.value,
    image: book.image.value,
    title: book.title.value,
  }),
  with: (properties: BookDTO) => properties,
}

export { BookDTO, CreateBookCommand }
