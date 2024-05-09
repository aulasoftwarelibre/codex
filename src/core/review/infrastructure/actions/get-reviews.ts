'use server'

import { ReviewResponse } from '@/core/review/dto/responses/review-response'
import { container } from '@/lib/container'

export async function getReviews(bookId: string): Promise<ReviewResponse[]> {
  try {
    return container.getReviews.with(bookId)
  } catch {
    return []
  }
}
