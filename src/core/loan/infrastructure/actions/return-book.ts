'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import ReturnBookRequest from '@/core/book/dto/requests/return-book.request'
import me from '@/core/user/infrastructure/actions/me'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

export interface ReturnBookForm {
  bookId: string
}

const ReturnBookSchema = z.object({
  bookId: z.string().min(1),
})

export async function returnBook(
  previousState: FormResponse<ReturnBookForm>,
  formData: FormData,
): Promise<FormResponse<ReturnBookForm>> {
  const { id: userId } = (await me()) || {}

  if (!userId) {
    return FormResponse.custom(
      ['general'],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  const result = ReturnBookSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { bookId } = result.data

  return await container.returnBook
    .with(ReturnBookRequest.with({ bookId }))
    .match(
      () => {
        revalidateTag('books')
        return FormResponse.success(
          previousState.data,
          'Libro marcado como devuelto.',
        )
      },
      (_error) =>
        FormResponse.custom(['general'], _error.message, previousState.data),
    )
}
