'use client'

import { Divider } from '@nextui-org/react'
import { redirect } from 'next/navigation'
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

      redirect('/')
    }
  }, [state])

  return (
    <>
      <form className="flex flex-col gap-4" action={action}>
        <InputForm label="Título" name="title" isRequired state={state} />
        <InputForm
          label="Autores"
          name="authors"
          isRequired
          description="Separados por comas"
          state={state}
        />
        <InputForm
          label="Imagen"
          name="image"
          isRequired
          description="Introduzca la URL de la portada del libro"
          state={state}
        />
        <Divider className="col-span-1 md:col-span-2" />
        <div className="flex flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
