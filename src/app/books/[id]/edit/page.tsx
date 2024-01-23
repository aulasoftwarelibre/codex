import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { notFound } from 'next/navigation'

import BookForm from '@/app/books/_components/book-form/book-form'
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
    <main>
      <Card className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 items-start p-4">
        <CardHeader>
          <h1 className="text-2xl font-extrabold">Editar libro</h1>
        </CardHeader>
        <CardBody className="col-span-1 lg:col-span-2 xl:col-span-3">
          <BookForm book={book} />
        </CardBody>
      </Card>
    </main>
  )
}
