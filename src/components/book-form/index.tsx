'use client'

import { Divider } from '@nextui-org/react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import InputForm from '@/components/input-form'
import SubmitButton from '@/components/submit-button'
import { showToast } from '@/components/toast'
import { createBook } from '@/core/book/infrastructure/actions/create-book'
import FormResponse from '@/lib/zod/form-response'

export default function BookForm() {
  // @ts-expect-error: TODO
  const [state, action] = useFormState(createBook, FormResponse.initialState())

  useEffect(() => {
    if (state?.success) {
      showToast('Libro catalogado con éxito')
    }
  }, [state])

  return (
    <>
      <form className="flex flex-col gap-4" action={action}>
        <InputForm
          label="Título"
          name="title"
          isRequired
          errors={state?.errors}
        />
        <InputForm
          label="Autores"
          name="authors"
          isRequired
          description="Separados por comas"
          errors={state?.errors}
        />
        <InputForm
          label="Imagen"
          name="image"
          isRequired
          description="Introduzca la URL de la portada del libro"
          errors={state?.errors}
        />
        <Divider className="col-span-1 md:col-span-2" />
        <div className="flex flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
