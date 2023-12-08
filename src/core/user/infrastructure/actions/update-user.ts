'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import UpdateUserRequest from '@/core/user/dto/requests/update-user.request'
import { auth } from '@/lib/auth/auth'
import container from '@/lib/container'
import gravatar from '@/lib/utils/gravatar'
import FormResponse from '@/lib/zod/form-response'

interface EditProfileForm {
  name?: string
}

const EditProfileSchema = z.object({
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

  const result = EditProfileSchema.safeParse({
    name: formData.get('name'),
  })

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { name } = result.data

  await container.updateUser.with(
    UpdateUserRequest.with({ email, image: gravatar(email), name }),
  )
  revalidateTag(`role-for-${email}`)

  return FormResponse.success(result.data, 'Perfil actualizado.')
}
