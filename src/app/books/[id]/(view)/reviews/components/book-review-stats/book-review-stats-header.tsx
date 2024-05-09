import { StarIcon } from '@heroicons/react/20/solid'
import { CardHeader } from '@nextui-org/card'
import React from 'react'

import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'
import { pluralize } from '@/lib/utils/pluralize'

interface BookReviewStatsHeaderProperties {
  reviewsStats: ReviewStatsResponse[]
}

export function BookReviewStatsHeader({
  reviewsStats,
}: BookReviewStatsHeaderProperties) {
  const totalReviews = countReviews(reviewsStats)
  const totalScore = sumScores(reviewsStats)
  const meanScore = totalReviews > 0 ? totalScore / totalReviews : 0

  return (
    <>
      <CardHeader className="flex items-center gap-2">
        <StarIcon className="h-5 w-5 fill-amber-300" />
        <span className="text-large font-semibold">{meanScore.toFixed(1)}</span>
        <span className="text-default-500">
          • (Basada en {pluralize(totalReviews, 'reseña', 'reseñas')})
        </span>
      </CardHeader>
    </>
  )
}

function countReviews(reviewsStats: Readonly<ReviewStatsResponse[]>) {
  return reviewsStats.reduce(
    (accumulator, reviewStats) => accumulator + reviewStats.reviews,
    0,
  )
}

function sumScores(reviewsStats: Readonly<ReviewStatsResponse[]>): number {
  return reviewsStats.reduce(
    (accumulator, reviewStats) =>
      accumulator + reviewStats.reviews * reviewStats.score,
    0,
  )
}
