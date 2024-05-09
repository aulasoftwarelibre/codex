'use server'

import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'
import { container } from '@/lib/container'

export async function getReviewStats(
  bookId: string,
): Promise<ReviewStatsResponse[]> {
  try {
    return await container.getReviewsStats.with(bookId)
  } catch {
    return []
  }
}
