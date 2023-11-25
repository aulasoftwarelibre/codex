import Book from '@/components/book'
import { BookDTO } from '@/core/book/application/types'

export interface BookGridProperties {
  books: BookDTO[]
}

export default function BookGrid(properties: BookGridProperties) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
        {properties.books.map((book) => (
          <Book key={book.id} book={book} onBorrow={() => ({})} />
        ))}
      </div>
    </>
  )
}
