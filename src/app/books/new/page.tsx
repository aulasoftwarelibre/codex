import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Metadata } from 'next'

import { BookImportForm } from '@/app/books/components/book-import-form'
import { BookViewForm } from '@/app/books/components/book-view-form'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Añadir un nuevo libro | Codex',
}

export default async function Page() {
  return (
    <main className="flex flex-col gap-6">
      <Card className="grid grid-cols-1 items-start p-4 lg:grid-cols-3 xl:grid-cols-4">
        <CardHeader>
          <h1 className="text-2xl font-extrabold">Añadir un nuevo libro</h1>
        </CardHeader>
        <CardBody className="col-span-1 lg:col-span-2 xl:col-span-3">
          <BookViewForm />
        </CardBody>
      </Card>

      <div className="grid grid-cols-3 place-items-center gap-4">
        <Divider />
        <span className="place-self-center">o</span>
        <Divider />
      </div>

      <Card className="grid grid-cols-1 items-start p-4 lg:grid-cols-3 xl:grid-cols-4">
        <CardHeader>
          <h1 className="text-2xl font-extrabold">Importar un nuevo libro</h1>
        </CardHeader>
        <CardBody className="col-span-1 lg:col-span-2 xl:col-span-3">
          <BookImportForm />
        </CardBody>
      </Card>
    </main>
  )
}
