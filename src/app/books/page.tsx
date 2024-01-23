import BookGrid from '@/app/books/_components/book-grid/book-grid'
import { findBooks } from '@/core/book/infrastructure/actions/find-books'
import me from '@/core/user/infrastructure/actions/me'

export default async function Home() {
  const books = await findBooks()
  const user = await me()

  return (
    <main>
      <BookGrid books={books} me={user} />
    </main>
  )
}
