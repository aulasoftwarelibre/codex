import { DeepReadonly } from 'ts-essentials'

import Book from '@/core/book/domain/model/book.entity'

type BookResponse = DeepReadonly<{
  authors: string[]
  id: string
  image: string
  title: string
}>

const BookResponse = {
  fromModel: (book: Book): BookResponse => ({
    authors: book.authors.map((author) => author.value),
    id: book.id.value,
    image: book.image.value,
    title: book.title.value,
  }),
  with: (properties: BookResponse) => properties,
}

export default BookResponse
