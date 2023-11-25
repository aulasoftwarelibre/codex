import BookGrid from '@/components/book-grid'
import { findBooks } from '@/core/book/infrastructure/actions/find-books'

export default async function Home() {
  const books = await findBooks()
  return (
    <main>
      <BookGrid books={books} />
    </main>
  )
}
