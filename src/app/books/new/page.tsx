import BookForm from '@/components/BookForm/BookForm'
import { createBook } from '@/core/book/infrastructure/actions'

export default async function Page() {
  return (
    <main>
      <h1>
        <strong>Crear Nuevo Libro</strong>
      </h1>
      <BookForm create={createBook} />
    </main>
  )
}
