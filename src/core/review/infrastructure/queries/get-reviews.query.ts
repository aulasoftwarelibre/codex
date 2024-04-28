import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { ReviewResponse } from '@/core/review/dto/responses/review-response'
import { ReviewType } from '@/core/review/infrastructure/persistence/review.type'

export class GetReviewsQuery {
  constructor(private readonly prisma: PrismaClient) {}

  with(bookId: string): ResultAsync<ReviewResponse[], ApplicationError> {
    return ResultAsync.fromPromise(
      this.prisma.review.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          bookId: bookId,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen((reviews) => this.mapToReviewResponse(reviews))
  }

  private mapToReviewResponse(reviews: ReviewType[]) {
    return okAsync(reviews.map((review) => ReviewResponse.fromType(review)))
  }
}
