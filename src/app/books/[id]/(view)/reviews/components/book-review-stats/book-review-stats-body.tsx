import { CardBody } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'
import React from 'react'

import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'
import { pluralize } from '@/lib/utils/pluralize'

interface BookReviewStatsBodyProperties {
  reviewsStats: ReviewStatsResponse[]
}

export function BookReviewStatsBody({
  reviewsStats,
}: BookReviewStatsBodyProperties) {
  const totalReviews = countReviews(reviewsStats)

  const progressBars = reviewsStats.map((reviewStats) => (
    <Progress
      color="warning"
      key={reviewStats.score}
      label={`${pluralize(reviewStats.score, 'estrella', 'estrellas')}`}
      maxValue={totalReviews > 0 ? totalReviews : 100}
      showValueLabel
      value={reviewStats.reviews}
    />
  ))

  return (
    <>
      <CardBody className="flex flex-col gap-2">{progressBars}</CardBody>
    </>
  )
}

function countReviews(reviewsStats: Readonly<ReviewStatsResponse[]>) {
  return reviewsStats.reduce(
    (accumulator, reviewStats) => accumulator + reviewStats.reviews,
    0,
  )
}
