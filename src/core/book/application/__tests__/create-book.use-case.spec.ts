import { describe, expect, it } from 'vitest'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { unexpected } from '@/lib/utils/unexpected'
import { bookRequestExamples } from '@/tests/examples/books-request.examples'
import { createAvailableBook } from '@/tests/examples/factories'

describe('CreateBookUseCase', () => {
  it('should create a new book', async () => {
    // Arrange
    const command = bookRequestExamples.create()

    // Act
    const result = await container.createBook.with(command)

    // Assert
    result.match(
      async () => {
        const savedBook = await prisma.book.findFirst({
          where: {
            id: command.id,
          },
        })
        expect(savedBook?.version).toEqual(0)
        expect(savedBook?.state).toEqual('AVAILABLE')
      },
      (error) => unexpected.error(error),
    )
  })

  it('should rejects to create a book with the same id', async () => {
    // Arrange
    const book = await createAvailableBook()
    const command = {
      ...bookRequestExamples.create(),
      id: book.id.value,
    }

    // Act
    const result = await container.createBook.with(command)

    // Assert
    result.match(
      (success) => unexpected.success(success),
      (error) => {
        expect(error).toBeInstanceOf(ApplicationError)
      },
    )
  })
})
