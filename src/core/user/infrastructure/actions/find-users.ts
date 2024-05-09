'use server'
import { unstable_cache as cache } from 'next/cache'

import { UserResponse } from '@/core/user/dto/responses/user.response'
import { container } from '@/lib/container'

export async function findUsers(): Promise<UserResponse[]> {
  const getCachedUsers = cache(
    async () => {
      try {
        return await container.findUsers.with()
      } catch {
        return []
      }
    },
    ['find-users'],
    {
      tags: ['users'],
    },
  )

  return getCachedUsers()
}
