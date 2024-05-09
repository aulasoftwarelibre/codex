import { Review } from '@/core/review/domain/model/review.entity'

export interface Reviews {
  save(review: Review): Promise<void>
}
