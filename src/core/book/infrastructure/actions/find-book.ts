'use server'

import { unstable_cache as cache } from 'next/cache'

import { BookResponse } from '@/core/book/dto/responses/book.response'
import { container } from '@/lib/container'

export async function findBook(
  bookId: string,
): Promise<BookResponse | undefined> {
  const getCachedBook = cache(
    async (id: string) => container.findBook.with(id).unwrapOr(undefined),
    [`book`],
    {
      tags: ['books', `book-${bookId}`],
    },
  )

  return getCachedBook(bookId)
}
