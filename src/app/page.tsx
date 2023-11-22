import BookGrid from '@/components/BookGrid/BookGrid'
import { findBooks } from '@/core/book/infrastructure/actions'

export default async function Home() {
  const books = await findBooks()
  return (
    <main>
      <BookGrid books={books} />
    </main>
  )
}
