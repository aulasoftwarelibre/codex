import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BookBreadcrumbs from '@/components/book-breadcrubs/book-breadcrubs'
import BookResponse from '@/core/book/dto/responses/book.response'
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
    <main className="flex flex-col gap-4 px-4 md:px-0">
      <BookBreadcrumbs title={book.title} />
      <div className="flex flex-col md:flex-row gap-4">
        <Image
          className="h-[297px] w-[320px] object-scale-down w-auto"
          alt={book.title}
          width={297}
          height={387}
          src={book.image}
        />
        <div className="flex flex-col gap-4">
          <div className="font-bold text-4xl text-default-800">
            {book.title}
          </div>
          <div className="line-clamp-1 text-xl">{book.authors.join(', ')}</div>
          <div className="flex-grow">
            <Button
              as={Link}
              href={`/books/${book.id}/edit`}
              prefetch
              variant="ghost"
            >
              Editar
            </Button>
          </div>
          <LoanBy book={book} />
        </div>
      </div>
    </main>
  )
}

function LoanBy({ book }: { book: BookResponse }) {
  if (!book.loan) {
    return <div>Este libro se encuentra disponible.</div>
  }

  return <div>Este libro se encuentra prestado a {book.loan.user.name}.</div>
}
