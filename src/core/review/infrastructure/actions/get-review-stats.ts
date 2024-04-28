'use server'

import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'
import { container } from '@/lib/container'

export async function getReviewStats(
  bookId: string,
): Promise<ReviewStatsResponse[]> {
  const result = container.getReviewsStats.with(bookId)

  return result.match(
    (reviewsStats) => reviewsStats,
    () => [],
  )
}
