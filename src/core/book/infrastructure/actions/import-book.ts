'use server'

import amazon, { type Product } from 'amazon-buddy'
import { revalidateTag } from 'next/cache'
import { ulid } from 'ulid'
import { z } from 'zod'

import { CreateBookRequest } from '@/core/book/dto/requests/create-book.request'
import { container } from '@/lib/container'
import { FormResponse } from '@/lib/zod/form-response'

export interface ImportBookForm {
  asin: string
  id?: string
}

const ImportBookSchema = z.object({
  asin: z.string().regex(/^[\dA-Z]{10}$/, 'El código ASIN no es válido.'),
})

export async function importBook(
  previousState: FormResponse<ImportBookForm>,
  formData: FormData,
): Promise<FormResponse<ImportBookForm>> {
  const result = ImportBookSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { asin } = result.data
  try {
    const { result: products } = await amazon.asin({ asin })
    if (products.length === 0) {
      return FormResponse.custom(
        ['asin'],
        'No ha sido posible obtener los datos de Amazon',
        result.data,
      )
    }

    const { authors, main_image: image, title } = products[0] as Product

    const id = ulid()
    const book = {
      authors: authors.map((author) => author.author),
      id,
      image,
      title,
    }
    await container.createBook.with(CreateBookRequest.with(book))

    revalidateTag('books')

    return FormResponse.success(
      { ...result.data, id },
      'El libro ha sido creado.',
    )
  } catch {
    return FormResponse.custom(
      ['asin'],
      'No ha sido posible obtener los datos de Amazon',
      result.data,
    )
  }
}
