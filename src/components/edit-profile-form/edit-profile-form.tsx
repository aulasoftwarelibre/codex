'use client'

import { Divider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import InputForm from '@/components/input-form/input-form'
import SubmitButton from '@/components/submit-button/submit-button'
import { showToast } from '@/components/toast/toast'
import UserResponse from '@/core/user/dto/responses/user.response'
import { updateUser } from '@/core/user/infrastructure/actions/update-user'
import FormResponse from '@/lib/zod/form-response'

interface EditProfileFormProperties {
  user: UserResponse
}

function useController(properties: EditProfileFormProperties) {
  const { user } = properties
  const formData = {
    name: user.name,
  }

  const formState = useFormState(
    updateUser,
    FormResponse.initialState(formData),
  )

  return { ...properties, formState }
}

export default function EditProfileForm(properties: EditProfileFormProperties) {
  const { formState, user } = useController(properties)
  const [state, action] = formState

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
            state={state}
          />
          <InputForm
            label="Correo electrónico"
            name="email"
            defaultValue={user?.email || ''}
            isRequired
            isReadOnly
            state={state}
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
