import { describe, expect, it } from 'vitest'

import { EditBookRequest } from '@/core/book/dto/requests/edit-book.request'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
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
    await container.editBook.with(command)

    // Assert
    const savedBook = await prisma.book.findFirst({
      where: {
        id: command.id,
      },
    })
    expect(savedBook?.version).toEqual(1)
    expect(savedBook?.title).toEqual(command.title)
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
    const result = async () => await container.editBook.with(command)

    // Assert
    expect(result).rejects.toThrowError()
  })
})
