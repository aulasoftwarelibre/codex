import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'

export class GetReviewStatsQuery {
  constructor(private readonly prisma: PrismaClient) {}

  with(bookId: string): ResultAsync<ReviewStatsResponse[], ApplicationError> {
    return ResultAsync.fromPromise(
      this.prisma.$queryRaw<{ reviews: number; score: number }[]>`
      SELECT scoreId as score, COUNT(r."score")::integer as reviews
      FROM generate_series(1,5) as scoreId
      LEFT JOIN "Review" r on scoreId = r."score" and r."bookId" = ${bookId}
      GROUP BY scoreId
      ORDER BY scoreId DESC
    `,
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen((stats) => this.mapToReviewStatsResponse(stats))
  }

  private mapToReviewStatsResponse(reviewsStats: ReviewStatsResponse[]) {
    return okAsync(
      reviewsStats.map((reviewStats) =>
        ReviewStatsResponse.fromRawQuery(reviewStats),
      ),
    )
  }
}
