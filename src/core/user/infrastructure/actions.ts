'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import {
  FindUserCommand,
  FindUserResponse,
  UpdateUserCommand,
} from '@/core/user/application/types'
import { auth } from '@/lib/auth/auth'
import container from '@/lib/container'

const UpdateFormSchema = z.object({
  name: z.string().min(3),
})

async function update(formData: FormData) {
  const session = await auth()
  const email = session?.user?.email as string

  if (!email) {
    throw new Error('Session not found')
  }

  const { name } = UpdateFormSchema.parse({
    name: formData.get('name'),
  })

  await container.updateUser.with(new UpdateUserCommand(name, email))

  revalidateTag(`role-for-${email}`)
}

async function find(email: string): Promise<FindUserResponse> {
  const result = await container.findUser.with(new FindUserCommand(email))

  if (result.isErr()) {
    throw new Error('User not found')
  }

  return result.value
}

export { find, update }
