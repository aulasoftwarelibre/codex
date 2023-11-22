import BookForm from '@/components/BookForm/BookForm'
import { createBook } from '@/core/book/infrastructure/actions'

export default async function Page() {
  const response = {
    message: 'good',
    success: true,
  }

  return (
    <main>
      <h1>
        <strong>Crear Nuevo Libro</strong>
      </h1>
      <BookForm book={response} create={createBook} />
    </main>
  )
}
