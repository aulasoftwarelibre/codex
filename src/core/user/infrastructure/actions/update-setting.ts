'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import UpdateSettingRequest from '@/core/user/dto/requests/update-setting.request'
import me from '@/core/user/infrastructure/actions/me'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

export type UpdatableFields = 'name' | 'email'

interface UpdateSettingForm {
  field: UpdatableFields
  value: string
}

const UpdateSettingMap = {
  name: z.object({
    field: z.string(),
    value: z.string().min(1).max(64),
  }),
}

type UpdateSettingMapKeys = keyof typeof UpdateSettingMap

export async function updateSetting(
  previousState: FormResponse<UpdateSettingForm>,
  formData: FormData,
): Promise<FormResponse<UpdateSettingForm>> {
  const user = await me()
  const { field } = previousState.data

  if (!user) {
    return FormResponse.custom(
      [field],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  const { email } = user

  if (!(field in UpdateSettingMap)) {
    return FormResponse.custom<UpdateSettingForm>(
      [field],
      'El campo no es válido',
      previousState.data,
    )
  }

  const result = UpdateSettingMap[field as UpdateSettingMapKeys].safeParse(
    Object.fromEntries(formData),
  )

  if (!result.success) {
    return FormResponse.withError<UpdateSettingForm>(
      result.error,
      previousState.data,
    )
  }

  const { value } = result.data

  await container.updateSetting.with(
    UpdateSettingRequest.with({ email, field, value }),
  )

  revalidateTag(`role-for-${email}`)

  return FormResponse.success<UpdateSettingForm>(
    result.data as UpdateSettingForm,
    'Perfil actualizado.',
  )
}
