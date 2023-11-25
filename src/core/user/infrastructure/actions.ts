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
import gravatar from '@/lib/utils/gravatar'
import FormResponse from '@/lib/zod/form-response'

const UpdateFormSchema = z.object({
  name: z.string().min(3),
})

export async function updateUser(
  previousState: unknown,
  formData: FormData,
): Promise<FormResponse> {
  const session = await auth()
  const email = session?.user?.email as string

  if (!email) {
    return FormResponse.custom(['email'], 'Error en la sesión del usuario')
  }

  const { name } = UpdateFormSchema.parse({
    name: formData.get('name'),
  })

  await container.updateUser.with(
    new UpdateUserCommand(name, email, gravatar(email)),
  )
  revalidateTag(`role-for-${email}`)

  return {
    success: true,
  }
}

export async function findUser(
  email: string,
): Promise<FindUserResponse | undefined> {
  const result = await container.findUser.with(new FindUserCommand(email))

  if (result.isErr()) {
    return undefined
  }

  return result.value
}
