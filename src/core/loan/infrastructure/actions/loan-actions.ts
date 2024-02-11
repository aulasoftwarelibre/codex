'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import LoanBookRequest from '@/core/book/dto/requests/loan-book.request'
import ReturnBookRequest from '@/core/book/dto/requests/return-book.request'
import me from '@/core/user/infrastructure/actions/me'
import container from '@/lib/container'
import FormResponse from '@/lib/zod/form-response'

export interface LoanActionForm {
  action: string
  bookId: string
}

const LoanActionSchema = z.object({
  action: z.enum(['loan', 'return']),
  bookId: z.string().min(1),
})

export async function loanAction(
  previousState: FormResponse<LoanActionForm>,
  formData: FormData,
): Promise<FormResponse<LoanActionForm>> {
  const { id: userId } = (await me()) || {}

  if (!userId) {
    return FormResponse.custom(
      ['general'],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  const result = LoanActionSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  const { action, bookId } = result.data

  switch (action) {
    case 'loan': {
      return loanBookAction(bookId, userId, previousState)
    }
    case 'return': {
      return returnBookAction(bookId, userId, previousState)
    }
    default: {
      return FormResponse.custom(
        ['action'],
        'La acción no es válida',
        previousState.data,
      )
    }
  }
}

async function loanBookAction(
  bookId: string,
  userId: string,
  previousState: FormResponse<LoanActionForm>,
) {
  return container.loanBook
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

async function returnBookAction(
  bookId: string,
  userId: string,
  previousState: FormResponse<LoanActionForm>,
) {
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
