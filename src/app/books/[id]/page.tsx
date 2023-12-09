import { notFound } from 'next/navigation'

import BookPage from '@/components/book-page'
import { findBook } from '@/core/book/infrastructure/actions/find-book'

interface PageParameters {
  id: string
}

export default async function Page({ params }: { params: PageParameters }) {
  const book = await findBook(params.id)

  if (!book) {
    return notFound()
  }

  return (
    <>
      <BookPage book={book} />
    </>
  )
}
