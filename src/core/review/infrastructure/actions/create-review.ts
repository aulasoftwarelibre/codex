'use server'

import { me } from '@/core/user/infrastructure/actions/me'
import { FormResponse } from '@/lib/zod/form-response'

export interface CreateReviewForm {
  bookId: string
  description: string
  id: string
  score: string
  title: string
}

export async function createReview(
  previousState: FormResponse<CreateReviewForm>,
): Promise<FormResponse<CreateReviewForm>> {
  const { id: userId } = (await me()) || {}

  if (!userId) {
    return FormResponse.custom(
      ['general'],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  return FormResponse.custom(['general'], 'No implementado', previousState.data)
}
