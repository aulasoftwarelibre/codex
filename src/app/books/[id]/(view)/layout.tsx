import { Divider } from '@nextui-org/divider'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { BookView } from '@/app/books/[id]/(view)/components/book-view'
import { BookViewTabs } from '@/app/books/[id]/(view)/components/book-view-tabs'
import { findBook } from '@/core/book/infrastructure/actions/find-book'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { me } from '@/core/user/infrastructure/actions/me'

interface PageParameters {
  id: string
}

export default async function Page({
  children,
  params,
}: {
  children: ReactNode
  params: PageParameters
}) {
  const book = await findBook(params.id)
  const user = (await me()) as UserResponse

  if (!book) {
    return notFound()
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <BookView book={book} user={user} />
        <Divider />
        <BookViewTabs id={params.id}>{children}</BookViewTabs>
      </div>
    </>
  )
}
