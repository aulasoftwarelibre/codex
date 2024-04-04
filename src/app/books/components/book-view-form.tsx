'use client'

import { Divider } from '@nextui-org/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { ulid } from 'ulid'

import { InputForm } from '@/components/form/input-form'
import { SubmitButton } from '@/components/form/submit-button'
import { showToast } from '@/components/form/toast'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { createBook } from '@/core/book/infrastructure/actions/create-book'
import { editBook } from '@/core/book/infrastructure/actions/edit-book'
import { FormResponse } from '@/lib/zod/form-response'

interface BookFormProperties {
  book?: BookResponse
}

function useController(properties: BookFormProperties) {
  const { book } = properties

  const formData = {
    authors: book?.authors.join(', ') ?? '',
    id: book?.id ?? ulid(),
    image: book?.image ?? '',
    title: book?.title ?? '',
  }

  const formState = useFormState(
    book ? editBook : createBook,
    FormResponse.initialState(formData),
  )

  return { ...properties, formState }
}

export function BookViewForm(properties: BookFormProperties) {
  const { formState } = useController(properties)
  const [state, action] = formState

  useEffect(() => {
    if (state?.success) {
      showToast(state.message)
      redirect(`/books/${state.data.id}`)
    }
  }, [state])

  return (
    <>
      <form action={action} className="flex flex-col gap-4">
        <input name="id" type="hidden" value={state.data.id} />
        <InputForm
          defaultValue={state.data.title}
          isRequired
          label="Título"
          name="title"
          state={state}
        />
        <InputForm
          defaultValue={state.data.authors}
          description="Separados por comas"
          isRequired
          label="Autores"
          name="authors"
          state={state}
        />
        <InputForm
          defaultValue={state.data.image}
          description="Introduzca la URL de la portada del libro"
          isRequired
          label="Imagen"
          name="image"
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
