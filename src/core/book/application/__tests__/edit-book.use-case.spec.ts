import { describe, expect, it } from 'vitest'

import { EditBookRequest } from '@/core/book/dto/requests/edit-book.request'
import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { unexpected } from '@/lib/utils/unexpected'
import { BooksExamples } from '@/tests/examples/books.examples'
import { createAvailableBook } from '@/tests/examples/factories'

describe('EditBookUseCase', () => {
  it('should edit a book', async () => {
    // Arrange
    const book = await createAvailableBook()
    const command = EditBookRequest.with({
      authors: book.authors.map((author) => author.value),
      id: book.id.value,
      image: book.image.value,
      title: 'A updated title',
    })

    // Act
    const result = await container.editBook.with(command)

    // Assert
    result.match(
      async () => {
        const savedBook = await prisma.book.findFirst({
          where: {
            id: command.id,
          },
        })
        expect(savedBook?.version).toEqual(1)
        expect(savedBook?.title).toEqual(command.title)
      },
      (error) => unexpected.error(error),
    )
  })

  it('should returns an error if book does not exists', async () => {
    // Arrange
    const book = BooksExamples.available()
    const command = EditBookRequest.with({
      authors: book.authors.map((author) => author.value),
      id: book.id.value,
      image: book.image.value,
      title: 'A updated title',
    })

    // Act
    const result = await container.editBook.with(command)

    // Assert
    result.match(
      (_ok) => unexpected.success(_ok),
      (error) => {
        expect(error).toBeInstanceOf(NotFoundError)
      },
    )
  })
})
