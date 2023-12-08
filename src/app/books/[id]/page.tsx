import Image from 'next/image'
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
    <main className="flex flex-col gap-4">
      <BookBreadcrumbs title={book.title} />
      <div className="flex gap-4">
        <Image
          className="h-[297px] w-[320px] object-scale-down"
          alt={book.title}
          width={297}
          height={387}
          src={book.image}
        />
        <div className="flex flex-col">
          <div className="font-bold text-4xl text-default-800">
            {book.title}
          </div>
          <div className="line-clamp-1 text-xl flex-grow">
            {book.authors.join(', ')}
          </div>
          <LoanBy book={book} />
        </div>
      </div>
    </main>
  )
}

function LoanBy({ book }: { book: BookResponse }) {
  if (!book.loan) {
    return null
  }

  return <div>Este libro se encuentra prestado a {book.loan.user.name}</div>
}
