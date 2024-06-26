'use server'

import { unstable_cache as cache } from 'next/cache'

import { BookResponse } from '@/core/book/dto/responses/book.response'
import { container } from '@/lib/container'

export async function findBook(
  bookId: string,
): Promise<BookResponse | undefined> {
  const getCachedBook = cache(
    async (id: string) => {
      try {
        return container.findBook.with(id)
      } catch {
        return undefined
      }
    },
    [`book`],
    {
      tags: ['books', `book-${bookId}`],
    },
  )

  return getCachedBook(bookId)
}
