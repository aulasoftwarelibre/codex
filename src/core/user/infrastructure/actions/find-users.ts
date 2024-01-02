'use server'
import { unstable_cache as cache } from 'next/cache'

import UserResponse from '@/core/user/dto/responses/user.response'
import container from '@/lib/container'

export async function findUsers(): Promise<UserResponse[]> {
  const getCachedUsers = cache(
    async () => container.findUsers.with().unwrapOr([]),
    ['find-users'],
    {
      tags: ['users'],
    },
  )

  return getCachedUsers()
}
