import { BookCardGrid } from '@/app/books/components/book-card-grid'
import { findBooks } from '@/core/book/infrastructure/actions/find-books'
import { me } from '@/core/user/infrastructure/actions/me'

export default async function Page() {
  const books = await findBooks()
  const user = await me()

  return (
    <main>
      <BookCardGrid books={books} me={user} />
    </main>
  )
}
