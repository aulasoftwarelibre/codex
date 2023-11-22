import container from '@/lib/container'

import { FindBookResponse } from '../application/types'

export async function findBooks(): Promise<FindBookResponse[]> {
  return container.findBooks.with()
}
