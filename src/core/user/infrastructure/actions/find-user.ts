'use server'

import { FindUserRequest } from '@/core/user/dto/requests/find-user.request'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { container } from '@/lib/container'

export async function findUser(
  email: string,
): Promise<UserResponse | undefined> {
  const result = await container.findUser.with(FindUserRequest.with({ email }))

  return result.match(
    (user) => user,
    () => undefined,
  )
}
