import { PrismaClient } from '@prisma/client'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Publisher } from '@/core/common/domain/publisher/publisher'
import { Review } from '@/core/review/domain/model/review.entity'
import { ReviewDataMapper } from '@/core/review/infrastructure/persistence/review.data-mapper'

export class ReviewPublisher extends Publisher<Review> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async create(review: Review): Promise<void> {
    const data = ReviewDataMapper.toPrisma(review)

    try {
      await this.prisma.review.create({ data })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  protected async update(review: Review, version: number): Promise<void> {
    const { id, ...data } = ReviewDataMapper.toPrisma(review)

    try {
      await this.prisma.review.update({
        data,
        where: {
          id,
          version,
        },
      })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }
}
