import React from 'react'

import { BookReview } from '@/app/books/[id]/(view)/reviews/components/book-review'
import { BookReviewStats } from '@/app/books/[id]/(view)/reviews/components/book-review-stats'
import { BookReviewStatsBody } from '@/app/books/[id]/(view)/reviews/components/book-review-stats/book-review-stats-body'
import { BookReviewStatsFooter } from '@/app/books/[id]/(view)/reviews/components/book-review-stats/book-review-stats-footer'
import { BookReviewStatsHeader } from '@/app/books/[id]/(view)/reviews/components/book-review-stats/book-review-stats-header'
import { getReviewStats } from '@/core/review/infrastructure/actions/get-review-stats'
import { getReviews } from '@/core/review/infrastructure/actions/get-reviews'
import { auth } from '@/lib/auth/auth'

interface PageParameters {
  id: string
}

export default async function Page({
  params: { id },
}: {
  params: PageParameters
}) {
  const session = await auth()
  const email = session?.user?.email

  const reviews = await getReviews(id)
  const reviewsStats = await getReviewStats(id)

  return (
    <>
      <div className="flex flex-col gap-10 xl:flex-row">
        <div className="basis-1/3">
          <BookReviewStats>
            <BookReviewStatsHeader reviewsStats={reviewsStats} />
            <BookReviewStatsBody reviewsStats={reviewsStats} />
            {email ? <BookReviewStatsFooter bookId={id} /> : null}
          </BookReviewStats>
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
