import { ulid } from 'ulid'

import { CreateBookRequest } from '@/core/book/dto/requests/create-book.request'
import { EditBookRequest } from '@/core/book/dto/requests/edit-book.request'

export const bookRequestExamples = {
  create: () =>
    CreateBookRequest.with({
      authors: ['Jenny Doe', 'John Doe'],
      id: ulid(),
      image: 'http://example.com/image.png',
      title: 'A book',
    }),
  edit: () =>
    EditBookRequest.with({
      authors: ['Jenny Doe', 'John Doe'],
      id: ulid(),
      image: 'http://example.com/image.png',
      title: 'A book',
    }),
}
