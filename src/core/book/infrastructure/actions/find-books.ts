'use server'

import { BookDTO } from '@/core/book/application/types'
import container from '@/lib/container'

export async function findBooks(): Promise<BookDTO[]> {
  return await container.findBooks.with().unwrapOr([])
}
