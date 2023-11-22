import container from '@/lib/container'

import { FindBookResponse } from '../application/types'

export async function findBooks(): Promise<FindBookResponse[] | null> {
  return container.findBooks.with()
}
