import { ulid } from 'ulid'

import BookFactory from '@/core/book/domain/model/book.factory'

const BooksExamples = {
  basic: () =>
    BookFactory.create({
      authors: ['Jane Doe'],
      id: ulid(),
      image: 'http://example.com/book.jpeg',
      title: 'A book',
    })._unsafeUnwrap(),
}

export default BooksExamples
