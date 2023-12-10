import { notFound } from 'next/navigation'

import BookPage from '@/components/book-page'
import { findBook } from '@/core/book/infrastructure/actions/find-book'
import getHistoricalLoans from '@/core/loan/infrastructure/actions/get-historical-loans'

interface PageParameters {
  id: string
}

export default async function Page({ params }: { params: PageParameters }) {
  const book = await findBook(params.id)
  const historicalLoans = await getHistoricalLoans(params.id)

  if (!book) {
    return notFound()
  }

  return (
    <>
      <BookPage book={book} historicalLoans={historicalLoans} />
    </>
  )
}
