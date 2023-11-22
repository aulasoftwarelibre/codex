'use client'

import { Divider, Input } from '@nextui-org/react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

import SubmitButton from '@/components/SubmitButton/SubmitButton'
import Toast from '@/components/Toast/Toast'
import {
  CreateBookResponse,
  FindBookResponse,
} from '@/core/book/application/types'

interface BookFormProps {
  book: FindBookResponse
  create: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<CreateBookResponse>
}

export default function BookForm(props: BookFormProps) {
  //const { create, book } = props
  const { create } = props
  const [state, action] = useFormState(create, undefined)

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
            label="Título"
            labelPlacement="outside"
            name="title"
            placeholder="Título"
            radius="none"
            size="lg"
            isRequired
          />
          <Input
            label="Autores"
            labelPlacement="outside"
            name="authors"
            placeholder="Autores"
            radius="none"
            size="lg"
            isRequired
            description="Separados por comas"
          />
          <Input
            label="Imagen"
            labelPlacement="outside"
            name="image"
            placeholder="Imagen"
            radius="none"
            size="lg"
            isRequired
            description="Introduzca la URL de la portada del libro"
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
