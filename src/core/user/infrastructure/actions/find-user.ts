'use server'

import { FindUserCommand, UserDTO } from '@/core/user/application/types'
import container from '@/lib/container'

export async function findUser(email: string): Promise<UserDTO | undefined> {
  const result = await container.findUser.with(new FindUserCommand(email))

  if (result.isErr()) {
    return undefined
  }

  return result.value
}
