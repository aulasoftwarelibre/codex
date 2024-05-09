import { PrismaClient } from '@prisma/client'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { ReviewResponse } from '@/core/review/dto/responses/review-response'
import { ReviewType } from '@/core/review/infrastructure/persistence/review.type'

export class GetReviewsQuery {
  constructor(private readonly prisma: PrismaClient) {}

  async with(bookId: string): Promise<ReviewResponse[]> {
    try {
      const reviews = await this.prisma.review.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          bookId: bookId,
        },
      })

      return this.mapToReviewResponse(reviews)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  private mapToReviewResponse(reviews: ReviewType[]) {
    return reviews.map((review) => ReviewResponse.fromType(review))
  }
}
