'use client'

import { Divider } from '@nextui-org/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { ulid } from 'ulid'

import InputForm from '@/components/input-form'
import SubmitButton from '@/components/submit-button'
import { showToast } from '@/components/toast'
import BookResponse from '@/core/book/dto/responses/book.response'
import { createBook } from '@/core/book/infrastructure/actions/create-book'
import { editBook } from '@/core/book/infrastructure/actions/edit-book'
import FormResponse from '@/lib/zod/form-response'

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

export default function BookForm(properties: BookFormProperties) {
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
      <form className="flex flex-col gap-4" action={action}>
        <input type="hidden" name="id" value={state.data.id} />
        <InputForm
          label="Título"
          name="title"
          isRequired
          state={state}
          defaultValue={state.data.title}
        />
        <InputForm
          label="Autores"
          name="authors"
          isRequired
          description="Separados por comas"
          state={state}
          defaultValue={state.data.authors}
        />
        <InputForm
          label="Imagen"
          name="image"
          isRequired
          description="Introduzca la URL de la portada del libro"
          state={state}
          defaultValue={state.data.image}
        />
        <Divider className="col-span-1 md:col-span-2" />
        <div className="flex flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
