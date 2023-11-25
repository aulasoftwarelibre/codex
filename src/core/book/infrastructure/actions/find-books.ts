'use server'

import { BookDTO } from '@/core/book/application/types'
import container from '@/lib/container'

export async function findBooks(): Promise<BookDTO[]> {
  return container.findBooks.with()
}
