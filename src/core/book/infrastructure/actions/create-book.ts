'use server'

import { ulid } from 'ulid'
import { z } from 'zod'

import { CreateBookCommand } from '@/core/book/application/types'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

export interface CreateBookForm {
  authors: string
  image: string
  title: string
}

const CreateFormSchema = z.object({
  authors: z.string().min(3, 'Introduzca un nombre de autor válido.'),
  image: z.string().url('Se debe indicar una URL válida.'),
  title: z.string().min(3, 'Introduzca un título válido.'),
})

export async function createBook(
  previousState: FormResponse<CreateBookForm>,
  formData: FormData,
): Promise<FormResponse<CreateBookForm>> {
  const id = ulid()
  const result = CreateFormSchema.safeParse({
    authors: formData.get('authors'),
    image: formData.get('image'),
    title: formData.get('title'),
  })

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { authors, image, title } = result.data

  await container.createBook.with(
    CreateBookCommand.with({ authors: authors.split(', '), id, image, title }),
  )

  return FormResponse.success(result.data)
}
