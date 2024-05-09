'use server'

import { revalidateTag } from 'next/cache'
import { ulid } from 'ulid'
import { z } from 'zod'

import { CreateReviewRequest } from '@/core/review/dto/requests/create-review.request'
import { me } from '@/core/user/infrastructure/actions/me'
import { container } from '@/lib/container'
import { FormResponse } from '@/lib/zod/form-response'

export interface CreateReviewForm {
  bookId: string
  description: string
  id: string
  score: string
  title: string
}

const CreateReviewSchema = z.object({
  bookId: z.string(),
  description: z.string().min(3, 'El contenido es demasiado corto'),
  id: z.string(),
  score: z.string(),
  title: z.string().min(3, 'El título es demasiado corto'),
})

export async function createReview(
  previousState: FormResponse<CreateReviewForm>,
  formData: FormData,
): Promise<FormResponse<CreateReviewForm>> {
  const { id: userId } = (await me()) || {}

  if (!userId) {
    return FormResponse.custom(
      ['general'],
      'Error en la sesión del usuario',
      previousState.data,
    )
  }

  const id = ulid()
  const result = CreateReviewSchema.safeParse(Object.fromEntries(formData))

  console.debug('createReview', result)

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  await container.createReview.with(
    CreateReviewRequest.with({
      ...result.data,
      id,
      score: +result.data.score,
      userId,
    }),
  )

  revalidateTag('books')
  revalidateTag(`book-${previousState.data.bookId}`)

  return FormResponse.success(
    {
      ...result.data,
      id,
    },
    'Gracias por tu reseña.',
  )
}
