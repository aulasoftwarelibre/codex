'use server'

import { revalidateTag } from 'next/cache'
import { ulid } from 'ulid'
import { z } from 'zod'

import { CreateBookRequest } from '@/core/book/dto/requests/create-book.request'
import { container } from '@/lib/container'
import { FormResponse } from '@/lib/zod/form-response'

export interface CreateBookForm {
  authors: string
  id: string
  image: string
  title: string
}

const CreateFormSchema = z.object({
  authors: z.string().min(3, 'Introduzca un nombre de autor válido.'),
  id: z.string(),
  image: z.string().url('Se debe indicar una URL válida.'),
  title: z.string().min(3, 'Introduzca un título válido.'),
})

export async function createBook(
  previousState: FormResponse<CreateBookForm>,
  formData: FormData,
): Promise<FormResponse<CreateBookForm>> {
  const id = ulid()
  const result = CreateFormSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  await container.createBook.with(
    CreateBookRequest.with({
      ...result.data,
      authors: result.data.authors.split(', '),
      id,
    }),
  )

  revalidateTag('books')

  return FormResponse.success(
    { ...result.data, id },
    'El libro ha sido creado.',
  )
}
