'use client'

import { Divider, Input } from '@nextui-org/react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

import SubmitButton from '@/components/SubmitButton/SubmitButton'
import Toast from '@/components/Toast/Toast'
import { FindUserResponse } from '@/core/user/application/types'
import { UpdateUserResponse } from '@/core/user/infrastructure/actions'

interface EditProfileFormProps {
  update: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<UpdateUserResponse>
  user: FindUserResponse
}

export default function EditProfileForm(props: EditProfileFormProps) {
  const { update, user } = props
  const [state, action] = useFormState(update, undefined)

  useEffect(() => {
    if (state?.success) {
      toast((t) => (
        <Toast
          message={state.message}
          onCloseHandler={() => toast.dismiss(t.id)}
        />
      ))
    }
  }, [state])

  return (
    <>
      <form className="flex flex-col gap-4" action={action}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
          <Input
            label="Nombre"
            labelPlacement="outside"
            name="name"
            defaultValue={user.name || ''}
            placeholder="Nombre"
            radius="none"
            size="lg"
            isRequired
          />
          <Input
            label="Correo electrónico"
            labelPlacement="outside"
            name="email"
            defaultValue={user.email || ''}
            placeholder="Correo electrónico"
            radius="none"
            size="lg"
            isReadOnly
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
