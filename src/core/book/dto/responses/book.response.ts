import { DeepReadonly } from 'ts-essentials'

import { BookType } from '@/core/book/infrastructure/persistence/book.type'
import { gravatar } from '@/lib/utils/gravatar'

type BookResponse = DeepReadonly<{
  authors: string[]
  id: string
  image: string
  loan?: {
    id: string
    startsAt: Date
    user: {
      id: string
      image: string
      name: string
    }
  }
  title: string
}>

const BookResponse = {
  fromType: (book: BookType): BookResponse => {
    return {
      authors: book.authors,
      id: book.id,
      image: book.image,
      title: book.title,
      ...(book?.loan
        ? {
            loan: {
              id: book.loan.id,
              startsAt: book.loan.startsAt,
              user: {
                id: book.loan.user.id,
                image: book.loan.user.image || gravatar(book.loan.user.email),
                name: book.loan.user.name,
              },
            },
          }
        : {}),
    } as BookResponse
  },
}

export { BookResponse }
