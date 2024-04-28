import { DeepReadonly } from 'ts-essentials'

import { ReviewType } from '@/core/review/infrastructure/persistence/review.type'

type ReviewResponse = DeepReadonly<{
  createdAt: string
  description: string
  id: string
  score: number
  title: string
  user: {
    image: string
    name: string
  }
}>

const ReviewResponse = {
  fromType(review: ReviewType): ReviewResponse {
    return {
      createdAt: review.createdAt.toISOString(),
      description: review.description,
      id: review.id,
      score: review.score,
      title: review.title,
      user: {
        image: review.user.image as string,
        name: review.user.name as string,
      },
    }
  },
}

export { ReviewResponse }
