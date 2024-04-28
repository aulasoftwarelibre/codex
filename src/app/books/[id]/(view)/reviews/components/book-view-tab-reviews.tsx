'use client'

import { BookReview } from '@/app/books/[id]/(view)/reviews/components/book-review'
import { BookReviewStats } from '@/app/books/[id]/(view)/reviews/components/book-review-stats'
import { ReviewResponse } from '@/core/review/dto/responses/review-response'
import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'

interface BookViewTabReviewsProperties {
  reviews: ReviewResponse[]
  reviewsStats: ReviewStatsResponse[]
}

export function BookViewTabReviews({
  reviews,
  reviewsStats,
}: BookViewTabReviewsProperties) {
  return (
    <>
      <div className="flex  flex-col gap-10 xl:flex-row">
        <div className="basis-1/3">
          <BookReviewStats reviewsStats={reviewsStats} />
        </div>
        <div className="basis-2/3">
          <div className="flex flex-col divide-y-1 divide-default-200">
            {reviews.map((review) => (
              <div className="py-10" key={review.id}>
                <BookReview {...review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
