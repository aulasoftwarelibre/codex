'use server'

import FindUserRequest from '@/core/user/dto/requests/find-user.request'
import UserResponse from '@/core/user/dto/responses/user.response'
import { auth } from '@/lib/auth/auth'
import container from '@/lib/container'

export default async function me(): Promise<UserResponse | undefined> {
  const session = await auth()
  const email = session?.user?.email as string

  if (!email) {
    return undefined
  }

  const result = await container.findUser.with(FindUserRequest.with({ email }))

  return result.match(
    (user) => user,
    () => undefined,
  )
}
