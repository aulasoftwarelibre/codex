'use client'

import { Divider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import InputForm from '@/components/input-form'
import SubmitButton from '@/components/submit-button'
import { showToast } from '@/components/toast'
import { UserDTO } from '@/core/user/application/types'
import { updateUser } from '@/core/user/infrastructure/actions/update-user'
import FormResponse from '@/lib/zod/form-response'

interface EditProfileFormProperties {
  user: UserDTO
}

export default function EditProfileForm(properties: EditProfileFormProperties) {
  const { user } = properties
  const [state, action] = useFormState(
    updateUser,
    FormResponse.initialState(user),
  )

  useEffect(() => {
    if (state.success) {
      showToast('Perfil actualizado')
    }
  }, [state])

  return (
    <>
      <form className="flex flex-col gap-4" action={action}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
          <InputForm
            label="Nombre"
            name="name"
            defaultValue={state.data?.name || ''}
            isRequired
            errors={state.errors}
          />
          <InputForm
            label="Correo electrónico"
            name="email"
            defaultValue={user?.email || ''}
            isRequired
            isReadOnly
            errors={state.errors}
          />
          <Divider className="col-span-1 md:col-span-2" />
        </div>
        <div className="flex flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
