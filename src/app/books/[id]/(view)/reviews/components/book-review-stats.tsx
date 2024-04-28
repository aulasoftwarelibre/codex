'use client'

import { PencilIcon, StarIcon } from '@heroicons/react/20/solid'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'
import React from 'react'

import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'

interface BookReviewStatsProperties {
  reviewsStats: ReviewStatsResponse[]
}

export function BookReviewStats({ reviewsStats }: BookReviewStatsProperties) {
  const totalReviews = countReviews(reviewsStats)
  const totalScore = sumScores(reviewsStats)
  const meanScore = totalReviews > 0 ? totalScore / totalReviews : 0

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
    <Card shadow="sm">
      <CardHeader className="flex items-center gap-2">
        <StarIcon className="h-5 w-5 fill-amber-300" />
        <span className="text-large font-semibold">{meanScore.toFixed(1)}</span>
        <span className="text-default-500">
          • (Basada en {pluralize(totalReviews, 'reseña', 'reseñas')})
        </span>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">{progressBars}</CardBody>
      <CardFooter className="flex w-full flex-col items-start gap-4">
        <Button
          fullWidth
          radius="full"
          startContent={<PencilIcon className="h-4 w-4" />}
          variant="bordered"
        >
          Escribir una reseña
        </Button>
        <p className="px-2 text-small text-default-500">
          Comparte tu opinión sobre este libro.
        </p>
      </CardFooter>
    </Card>
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

function pluralize(amount: number, singular: string, plural: string): string {
  return `${amount} ${amount === 1 ? singular : plural}`
}
