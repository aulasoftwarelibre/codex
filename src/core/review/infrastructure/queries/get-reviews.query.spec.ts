import { ulid } from 'ulid'
import { describe, expect, it } from 'vitest'

import { Book } from '@/core/book/domain/model/book.entity'
import { User } from '@/core/user/domain/model/user.entity'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { createAvailableBook, createUser } from '@/tests/examples/factories'
import { UsersExamples } from '@/tests/examples/users.examples'

describe('GetReviewsQuery', () => {
  it('should return empty reviews', async () => {
    // Arrange
    const book = await createAvailableBook()

    // Act
    const response = await container.getReviews.with(book.id.value)

    // Assert
    expect(response).toStrictEqual([])
  })

  it('should return published book reviews', async () => {
    // Arrange
    const book = await createAvailableBook()
    const user1 = await createUser(UsersExamples.basic())
    await createReview(book, user1, 5)

    // Act
    const response = await container.getReviews.with(book.id.value)

    // Assert
    expect(response).toHaveLength(1)
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'description',
          title: 'title',
        }),
      ]),
    )
  })
})

async function createReview(book: Book, user: User, score: number) {
  await prisma.review.create({
    data: {
      bookId: book.id.value,
      description: 'description',
      id: ulid(),
      score,
      title: 'title',
      userId: user.id.value,
    },
  })
}
