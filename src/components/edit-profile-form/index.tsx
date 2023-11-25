'use client'

import { Divider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

import InputForm from '@/components/input-form'
import SubmitButton from '@/components/submit-button'
import Toast from '@/components/toast'
import { FindUserResponse } from '@/core/user/application/types'
import { updateUser } from '@/core/user/infrastructure/actions'
import FormResponse from '@/lib/zod/form-response'

interface EditProfileFormProperties {
  user: FindUserResponse
}

export default function EditProfileForm(properties: EditProfileFormProperties) {
  const { user } = properties
  const [state, action] = useFormState(updateUser, FormResponse.initialState())

  useEffect(() => {
    if (state?.success) {
      toast((t) => (
        <Toast
          message="Perfil actualizado."
          onCloseHandler={() => toast.dismiss(t.id)}
        />
      ))
    }
  }, [state])

  return (
    <>
      <form className="flex flex-col gap-4" action={action}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
          <InputForm
            label="Nombre"
            name="name"
            defaultValue={user.name || ''}
            isRequired
            errors={state?.errors}
          />
          <InputForm
            label="Correo electrónico"
            name="email"
            defaultValue={user.email || ''}
            isRequired
            isReadOnly
            errors={state?.errors}
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
