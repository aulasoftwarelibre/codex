'use server'

import { z } from 'zod'

import { CreateBookCommand } from '@/core/book/application/types'
import BookId from '@/core/book/domain/model/id.value-object'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

const CreateFormSchema = z.object({
  authors: z.string().min(3, 'Introduzca un nombre de autor válido.'),
  image: z.string().url('Se debe indicar una URL válida.'),
  title: z.string().min(3, 'Introduzca un título válido.'),
})

export async function createBook(
  previousState: unknown,
  formData: FormData,
): Promise<FormResponse> {
  const id = BookId.generate()
  const result = CreateFormSchema.safeParse({
    authors: formData.get('authors'),
    image: formData.get('image'),
    title: formData.get('title'),
  })

  if (!result.success) {
    return {
      errors: result.error.issues,
      success: false,
    }
  }

  const { authors, image, title } = result.data

  await container.createBook.with(
    new CreateBookCommand(id.value, title, authors.split(', '), image),
  )

  return FormResponse.success()
}
