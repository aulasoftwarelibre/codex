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

const UpdateFormSchema = z.object({
  name: z.string().min(3),
})

export interface UpdateUserResponse {
  message: string
  success: boolean
}

export async function updateUser(
  prevState: unknown,
  formData: FormData,
): Promise<UpdateUserResponse> {
  const session = await auth()
  const email = session?.user?.email as string

  if (!email) {
    return {
      message: 'Error: Sesión no encontrada',
      success: false,
    }
  }

  const { name } = UpdateFormSchema.parse({
    name: formData.get('name'),
  })

  await container.updateUser.with(
    new UpdateUserCommand(name, email, gravatar(email)),
  )
  revalidateTag(`role-for-${email}`)

  return {
    message: 'Perfil actualizado',
    success: true,
  }
}

export async function findUser(
  email: string,
): Promise<FindUserResponse | null> {
  const result = await container.findUser.with(new FindUserCommand(email))

  if (result.isErr()) {
    return null
  }

  return result.value
}
