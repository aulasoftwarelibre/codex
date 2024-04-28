import { ulid } from 'ulid'
import { describe, expect, it } from 'vitest'

import { Book } from '@/core/book/domain/model/book.entity'
import { User } from '@/core/user/domain/model/user.entity'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { unexpected } from '@/lib/utils/unexpected'
import { createAvailableBook, createUser } from '@/tests/examples/factories'
import { UsersExamples } from '@/tests/examples/users.examples'

describe('GetReviewStatsQuery', () => {
  it('should return empty stats', async () => {
    // Arrange
    const book = await createAvailableBook()

    // Act
    const result = await container.getReviewsStats.with(book.id.value)

    // Assert
    result.match(
      (response) => {
        expect(response).toContainEqual({ reviews: 0, score: 1 })
        expect(response).toContainEqual({ reviews: 0, score: 2 })
        expect(response).toContainEqual({ reviews: 0, score: 3 })
        expect(response).toContainEqual({ reviews: 0, score: 4 })
        expect(response).toContainEqual({ reviews: 0, score: 5 })
      },
      (error) => unexpected.error(error),
    )
  })

  it('should return reviews stats', async () => {
    // Arrange
    const book = await createAvailableBook()
    const user1 = await createUser(UsersExamples.basic())
    const user2 = await createUser(UsersExamples.member())
    await createReview(book, user1, 5)
    await createReview(book, user2, 1)

    // Act
    const result = await container.getReviewsStats.with(book.id.value)

    // Assert
    result.match(
      (response) => {
        expect(response).toContainEqual({ reviews: 1, score: 1 })
        expect(response).toContainEqual({ reviews: 0, score: 2 })
        expect(response).toContainEqual({ reviews: 0, score: 3 })
        expect(response).toContainEqual({ reviews: 0, score: 4 })
        expect(response).toContainEqual({ reviews: 1, score: 5 })
      },
      (error) => unexpected.error(error),
    )
  })
})

async function createReview(book: Book, user: User, score: number) {
  await prisma.review.create({
    data: {
      bookId: book.id.value,
      id: ulid(),
      score,
      userId: user.id.value,
    },
  })
}
