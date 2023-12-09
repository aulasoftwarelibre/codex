import type { Metadata } from 'next'

import BookGrid from '@/components/book-grid'
import { searchBooks } from '@/core/book/infrastructure/actions/search-books'
import me from '@/core/user/infrastructure/actions/me'

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
        <h1 className="font-extrabold text-2xl">
          {message}:<span className="text-default-700 ml-2">{query}</span>
        </h1>
        <BookGrid books={books} me={user} />
      </main>
    </>
  )
}
