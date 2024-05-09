import { PrismaClient } from '@prisma/client'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { ReviewStatsResponse } from '@/core/review/dto/responses/review-stats.response'

export class GetReviewStatsQuery {
  constructor(private readonly prisma: PrismaClient) {}

  async with(bookId: string): Promise<ReviewStatsResponse[]> {
    try {
      const stats = await this.prisma.$queryRaw<
        { reviews: number; score: number }[]
      >`
      SELECT scoreId as score, COUNT(r."score")::integer as reviews
      FROM generate_series(1,5) as scoreId
      LEFT JOIN "Review" r on scoreId = r."score" and r."bookId" = ${bookId}
      GROUP BY scoreId
      ORDER BY scoreId DESC
    `
      return this.mapToReviewStatsResponse(stats)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  private mapToReviewStatsResponse(reviewsStats: ReviewStatsResponse[]) {
    return reviewsStats.map((reviewStats) =>
      ReviewStatsResponse.fromRawQuery(reviewStats),
    )
  }
}
