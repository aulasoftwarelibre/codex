import { PrismaClient } from '@prisma/client'

import { Review } from '@/core/review/domain/model/review.entity'
import { Reviews } from '@/core/review/domain/services/reviews.repository'
import { ReviewPublisher } from '@/core/review/infrastructure/persistence/review.publisher'

export class ReviewsPrisma implements Reviews {
  private publisher: ReviewPublisher

  constructor(private readonly prisma: PrismaClient) {
    this.publisher = new ReviewPublisher(prisma)
  }

  async save(review: Review): Promise<void> {
    return this.publisher.mergeObjectContext(review).commit()
  }
}
