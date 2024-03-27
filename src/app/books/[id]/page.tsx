import { notFound } from 'next/navigation'

import { BookView } from '@/app/books/components/book-view'
import { findBook } from '@/core/book/infrastructure/actions/find-book'
import { getHistoricalLoans } from '@/core/loan/infrastructure/actions/get-historical-loans'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { me } from '@/core/user/infrastructure/actions/me'

interface PageParameters {
  id: string
}

export default async function Page({ params }: { params: PageParameters }) {
  const book = await findBook(params.id)
  const historicalLoans = await getHistoricalLoans(params.id)
  const user = (await me()) as UserResponse

  if (!book) {
    return notFound()
  }

  return (
    <>
      <BookView user={user} book={book} historicalLoans={historicalLoans} />
    </>
  )
}
