import { ulid } from 'ulid'

import CreateBookRequest from '@/core/book/dto/requests/create-book.request'

const bookRequestExamples = {
  create: () =>
    CreateBookRequest.with({
      authors: ['Jenny Doe', 'John Doe'],
      id: ulid(),
      image: 'http://example.com/image.png',
      title: 'A book',
    }),
}

export default bookRequestExamples
