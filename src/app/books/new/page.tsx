import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Metadata } from 'next'

import BookForm from '@/app/books/_components/book-form/book-form'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Añadir un nuevo libro | Codex',
}

export default async function Page() {
  return (
    <main>
      <Card className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 items-start p-4">
        <CardHeader>
          <h1 className="text-2xl font-extrabold">Añadir un nuevo libro</h1>
        </CardHeader>
        <CardBody className="col-span-1 lg:col-span-2 xl:col-span-3">
          <BookForm />
        </CardBody>
      </Card>
    </main>
  )
}
