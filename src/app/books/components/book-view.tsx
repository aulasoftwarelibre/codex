'use client'

import { Button } from '@nextui-org/button'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

import { BookCard } from '@/app/books/components/book-card'
import { BookViewBreadcrumbs } from '@/app/books/components/book-view-breadcrumbs'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { HistoricalLoansResponse } from '@/core/loan/dto/responses/historical-loans.response'
import { UserResponse } from '@/core/user/dto/responses/user.response'

interface BookPageProperties {
  book: BookResponse
  historicalLoans: HistoricalLoansResponse[]
  user?: UserResponse
}

export function BookView(properties: BookPageProperties) {
  const { book, historicalLoans, user } = properties
  return (
    <>
      <main className="flex flex-col gap-4 px-4 md:px-0">
        <BookViewBreadcrumbs title={book.title} />
        <div className="flex flex-col gap-4 md:flex-row">
          <BookCard book={book} me={user} />
          <div className="flex flex-col gap-4">
            <h1
              aria-label="Título"
              className="text-4xl font-bold text-default-800"
            >
              {book.title}
            </h1>
            <div aria-label="Autores" className="line-clamp-1 text-xl">
              {book.authors.join(', ')}
            </div>
            <div className="flex-grow">
              {user && user.roles.includes('ROLE_ADMIN') ? (
                <Button
                  as={Link}
                  href={`/books/${book.id}/edit`}
                  prefetch
                  variant="ghost"
                >
                  Editar
                </Button>
              ) : null}
            </div>
            <LoanBy book={book} />
          </div>
        </div>
        <h2 className="mt-4 text-3xl font-bold">Histórico de préstamos</h2>
        <Table aria-label="Listado historico" isStriped>
          <TableHeader>
            <TableColumn>Usuario</TableColumn>
            <TableColumn>Fecha de préstamo</TableColumn>
            <TableColumn>Fecha de devolución</TableColumn>
          </TableHeader>
          <TableBody items={historicalLoans}>
            {(historicalLoan) => (
              <TableRow key={historicalLoan.id}>
                <TableCell>{historicalLoan.user.name}</TableCell>
                <TableCell>{shortDate(historicalLoan.startsAt)}</TableCell>
                <TableCell>{shortDate(historicalLoan.finishedAt)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </>
  )
}

function LoanBy({ book }: { book: BookResponse }) {
  if (!book.loan) {
    return <div>Este libro se encuentra disponible.</div>
  }

  return (
    <div>
      Este libro se encuentra prestado a {book.loan.user.name} desde el{' '}
      {longDate(book.loan.startsAt)}.
    </div>
  )
}

function longDate(date: string | Date) {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", {
    locale: es,
  })
}

function shortDate(date: string | Date) {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: es,
  })
}