import { FindBookResponse } from '@/core/book/application/types'

import Book from '../Book/Book'

export interface BookGridProps {
  books: FindBookResponse[]
}

export default function BookGrid(props: BookGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
        {props.books.map((book) => (
          <Book
            key={book.id}
            authors={book.authors}
            title={book.title}
            image={book.image}
          />
        ))}
      </div>
    </>
  )
}
