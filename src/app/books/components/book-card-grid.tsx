import { BookCard } from '@/app/books/components/book-card'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { UserResponse } from '@/core/user/dto/responses/user.response'

export interface BookGridProperties {
  books: BookResponse[]
  me?: UserResponse
}

export function BookCardGrid(properties: BookGridProperties) {
  const { books, me } = properties
  return (
    <>
      <div
        role="grid"
        className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {books.map((book) => (
          <BookCard book={book} me={me} key={book.id} />
        ))}
      </div>
    </>
  )
}
