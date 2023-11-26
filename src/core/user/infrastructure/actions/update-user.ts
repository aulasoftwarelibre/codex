'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { UpdateUserCommand } from '@/core/user/application/types'
import { auth } from '@/lib/auth/auth'
import container from '@/lib/container'
import gravatar from '@/lib/utils/gravatar'
import FormResponse from '@/lib/zod/form-response'

interface EditProfileForm {
  name?: string
}

const UpdateFormSchema = z.object({
  name: z.string().min(3),
})

export async function updateUser(
  previousState: FormResponse<EditProfileForm>,
  formData: FormData,
): Promise<FormResponse<EditProfileForm>> {
  const session = await auth()
  const email = session?.user?.email as string

  if (!email) {
    return FormResponse.custom(
      ['email'],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  const result = UpdateFormSchema.safeParse({
    name: formData.get('name'),
  })

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { name } = result.data

  await container.updateUser.with(
    new UpdateUserCommand(name, email, gravatar(email)),
  )
  revalidateTag(`role-for-${email}`)

  return FormResponse.success(result.data)
}
