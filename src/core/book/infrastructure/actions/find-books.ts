'use server'

import { unstable_cache as cache } from 'next/cache'

import { BookResponse } from '@/core/book/dto/responses/book.response'
import { container } from '@/lib/container'

export async function findBooks(): Promise<BookResponse[]> {
  const getCachedBooks = cache(
    async () => {
      try {
        return await container.findBooks.with()
      } catch {
        return []
      }
    },
    ['find-books'],
    {
      tags: ['books'],
    },
  )

  return getCachedBooks()
}
