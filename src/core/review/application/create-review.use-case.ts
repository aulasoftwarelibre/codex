import { ReviewFactory } from '@/core/review/domain/model/review.factory'
import { Reviews } from '@/core/review/domain/services/reviews.repository'
import { CreateReviewRequest } from '@/core/review/dto/requests/create-review.request'

export class CreateReviewUseCase {
  constructor(private readonly reviews: Reviews) {}

  async with(command: CreateReviewRequest) {
    const review = ReviewFactory.create(command)
    return this.reviews.save(review)
  }
}
