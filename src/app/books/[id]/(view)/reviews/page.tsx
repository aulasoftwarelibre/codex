import { BookViewTabReviews } from '@/app/books/[id]/(view)/reviews/components/book-view-tab-reviews'
import { getReviewStats } from '@/core/review/infrastructure/actions/get-review-stats'
import { getReviews } from '@/core/review/infrastructure/actions/get-reviews'

interface PageParameters {
  id: string
}

export default async function Page({ params }: { params: PageParameters }) {
  const reviews = await getReviews(params.id)
  const reviewsStats = await getReviewStats(params.id)

  return <BookViewTabReviews reviews={reviews} reviewsStats={reviewsStats} />
}
