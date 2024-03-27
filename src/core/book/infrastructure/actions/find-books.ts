'use server'

import { unstable_cache as cache } from 'next/cache'

import { BookResponse } from '@/core/book/dto/responses/book.response'
import { container } from '@/lib/container'

export async function findBooks(): Promise<BookResponse[]> {
  const getCachedBooks = cache(
    async () => container.findBooks.with().unwrapOr([]),
    ['find-books'],
    {
      tags: ['books'],
    },
  )

  return getCachedBooks()
}
