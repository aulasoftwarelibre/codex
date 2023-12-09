'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import EditBookRequest from '@/core/book/dto/requests/edit-book.request'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

export interface EditBookForm {
  authors: string
  id: string
  image: string
  title: string
}

const EditFormSchema = z.object({
  authors: z.string().min(3, 'Introduzca un nombre de autor válido.'),
  id: z.string().min(1, 'Falta el identificar'),
  image: z.string().url('Se debe indicar una URL válida.'),
  title: z.string().min(3, 'Introduzca un título válido.'),
})

export async function editBook(
  previousState: FormResponse<EditBookForm>,
  formData: FormData,
): Promise<FormResponse<EditBookForm>> {
  const result = EditFormSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  await container.editBook.with(
    EditBookRequest.with({
      ...result.data,
      authors: result.data.authors.split(', '),
    }),
  )

  revalidateTag('books')
  revalidateTag(`book-${previousState.data.id}`)

  return FormResponse.success(result.data, 'El libro ha sido actualizado.')
}
