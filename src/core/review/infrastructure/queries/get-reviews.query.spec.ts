import { ulid } from 'ulid'
import { describe, expect, it } from 'vitest'

import { Book } from '@/core/book/domain/model/book.entity'
import { User } from '@/core/user/domain/model/user.entity'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { unexpected } from '@/lib/utils/unexpected'
import { createAvailableBook, createUser } from '@/tests/examples/factories'
import { UsersExamples } from '@/tests/examples/users.examples'

describe('GetReviewsQuery', () => {
  it('should return empty reviews', async () => {
    // Arrange
    const book = await createAvailableBook()

    // Act
    const result = await container.getReviews.with(book.id.value)

    // Assert
    result.match(
      (response) => {
        expect(response).toStrictEqual([])
      },
      (error) => unexpected.error(error),
    )
  })

  it('should return published book reviews', async () => {
    // Arrange
    const book = await createAvailableBook()
    const user1 = await createUser(UsersExamples.basic())
    await createReview(book, user1, 5)

    // Act
    const result = await container.getReviews.with(book.id.value)

    // Assert
    result.match(
      (response) => {
        expect(response).toHaveLength(1)
        expect(response).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              description: 'description',
              title: 'title',
            }),
          ]),
        )
      },
      (error) => unexpected.error(error),
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
