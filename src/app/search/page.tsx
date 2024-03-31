import type { Metadata } from 'next'

import { BookCardGrid } from '@/app/books/components/book-card-grid'
import { searchBooks } from '@/core/book/infrastructure/actions/search-books'
import { me } from '@/core/user/infrastructure/actions/me'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Búscar | Codex',
}
interface PageProperties {
  searchParams: {
    query?: string
  }
}

export default async function Page(properties: PageProperties) {
  const user = await me()

  const {
    searchParams: { query },
  } = properties

  if (!query) {
    return null
  }

  const books = await searchBooks({ terms: query.split(/\s+/) })

  const message =
    books.length === 1
      ? `${books.length} resultado para la búsqueda`
      : `${books.length} resultados para la búsqueda`

  return (
    <>
      <main className="flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold">
          {message}:<span className="ml-2 text-default-700">{query}</span>
        </h1>
        <BookCardGrid books={books} me={user} />
      </main>
    </>
  )
}
