'use server'

import BookResponse from '@/core/book/dto/responses/book.response'
import container from '@/lib/container'

export async function findBooks(): Promise<BookResponse[]> {
  return await container.findBooks.with().unwrapOr([])
}
