'use server'

import { ReviewResponse } from '@/core/review/dto/responses/review-response'
import { container } from '@/lib/container'

export async function getReviews(bookId: string): Promise<ReviewResponse[]> {
  const result = container.getReviews.with(bookId)

  return result.match(
    (reviews) => reviews,
    (error) => {
      console.debug(error)
      return []
    },
  )
}
