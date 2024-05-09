'use server'

import { unstable_cache as cache } from 'next/dist/server/web/spec-extension/unstable-cache'

import { SearchBookRequest } from '@/core/book/dto/requests/search-book.requests'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { container } from '@/lib/container'

export async function searchBooks(
  request?: SearchBookRequest,
): Promise<BookResponse[]> {
  if (!request || !request.terms) {
    return []
  }

  const getCachedBooks = cache(
    async (_request) => {
      try {
        return await container.findBooks.with(_request)
      } catch {
        return []
      }
    },
    ['search-books'],
    {
      tags: ['books'],
    },
  )

  return getCachedBooks(request)
}
