import { BookId } from '@/core/common/domain/value-objects/book-id'
import { Description } from '@/core/common/domain/value-objects/description'
import { ReviewId } from '@/core/common/domain/value-objects/review-id'
import { Score } from '@/core/common/domain/value-objects/score'
import { Title } from '@/core/common/domain/value-objects/title'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { Review } from '@/core/review/domain/model/review.entity'
import { CreateReviewRequest } from '@/core/review/dto/requests/create-review.request'

export const ReviewFactory = {
  create: (reviewResponse: CreateReviewRequest): Review => {
    const reviewId = ReviewId.create(reviewResponse.id)
    const bookId = BookId.create(reviewResponse.bookId)
    const userId = UserId.create(reviewResponse.userId)
    const title = Title.create(reviewResponse.title)
    const description = Description.create(reviewResponse.description)
    const score = Score.create(reviewResponse.score)

    return new Review(reviewId, bookId, userId, title, description, score)
  },
}
