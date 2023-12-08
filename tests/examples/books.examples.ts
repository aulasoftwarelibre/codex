import { ulid } from 'ulid'

import { BookState } from '@/core/book/domain/model/book.entity'
import BookDataMapper from '@/core/book/infrastructure/persistence/book.data-mapper'
import gravatar from '@/lib/utils/gravatar'

const BooksExamples = {
  available: () =>
    BookDataMapper.toAvailableBook({
      authors: ['Jane Doe'],
      id: ulid(),
      image: 'http://example.com/book.jpeg',
      loan: null,
      state: BookState.AVAILABLE,
      title: 'A book',
      version: 0,
    }),
  loaned: () =>
    BookDataMapper.toLoanedBook({
      authors: ['Jane Doe'],
      id: ulid(),
      image: 'http://example.com/book.jpeg',
      loan: {
        bookId: ulid(),
        id: ulid(),
        startsAt: new Date(),
        user: {
          email: 'test@example.com',
          emailVerified: null,
          id: ulid(),
          image: gravatar('test@example.com'),
          name: 'Test User',
          roles: ['ROLE_USER'],
          version: 0,
        },
        userId: ulid(),
        version: 0,
      },
      state: BookState.LOANED,
      title: 'A book',
      version: 0,
    }),
}

export default BooksExamples
