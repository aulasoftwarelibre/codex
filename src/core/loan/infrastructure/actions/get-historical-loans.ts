'use server'

import { unstable_cache as cache } from 'next/cache'

import { HistoricalLoansResponse } from '@/core/loan/dto/responses/historical-loans.response'
import { container } from '@/lib/container'

export async function getHistoricalLoans(
  bookId: string,
): Promise<HistoricalLoansResponse[]> {
  const getCachedLoans = cache(
    async (id: string) => container.getHistoricalLoans.with(id).unwrapOr([]),
    ['historical-loans'],
    {
      tags: [`book-${bookId}`, 'books'],
    },
  )

  return getCachedLoans(bookId)
}
