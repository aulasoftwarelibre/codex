import { Review } from '@/core/review/domain/model/review.entity'

const ReviewDataMapper = {
  toPrisma: (review: Review) => ({
    bookId: review.bookId.value,
    description: review.description.value,
    id: review.id.value,
    score: review.score.value,
    title: review.title.value,
    userId: review.userId.value,
  }),
}

export { ReviewDataMapper }
