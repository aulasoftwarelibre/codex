'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import LoanBookRequest from '@/core/book/dto/requests/loan-book.request'
import me from '@/core/user/infrastructure/actions/me'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

export interface LoanBookForm {
  bookId: string
}

const LoanFormSchema = z.object({
  bookId: z.string().min(1),
})

export async function loanBook(
  previousState: FormResponse<LoanBookForm>,
  formData: FormData,
): Promise<FormResponse<LoanBookForm>> {
  const { id: userId } = (await me()) || {}

  if (!userId) {
    return FormResponse.custom(
      ['general'],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  const result = LoanFormSchema.safeParse({
    bookId: formData.get('bookId'),
  })

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { bookId } = result.data

  return await container.loanBook
    .with(
      LoanBookRequest.with({
        bookId,
        userId,
      }),
    )
    .match(
      () => {
        revalidateTag('books')
        return FormResponse.success(
          previousState.data,
          'Libro marcado como prestado.',
        )
      },
      (_error) =>
        FormResponse.custom(['general'], _error.message, previousState.data),
    )
}
