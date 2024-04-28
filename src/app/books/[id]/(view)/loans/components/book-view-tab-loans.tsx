'use client'

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

import { HistoricalLoansResponse } from '@/core/loan/dto/responses/historical-loans.response'

interface BookViewTabLoansProperties {
  historicalLoans: HistoricalLoansResponse[]
}

export function BookViewTabLoans({
  historicalLoans,
}: BookViewTabLoansProperties) {
  return (
    <>
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
    </>
  )
}

function shortDate(date: string | Date) {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: es,
  })
}
