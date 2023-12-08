import { describe, expect, it } from 'vitest'

import CreateBookUseCase from '@/core/book/application/create-book.use-case'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import DuplicateIdError from '@/core/common/domain/errors/application/duplicate-id-error'
import unexpected from '@/lib/utils/unexpected'
import BooksExamples from '@/tests/examples/books.examples'
import bookRequestExamples from '@/tests/examples/books-request.examples'

describe('CreateBookUseCase', () => {
  it('should create a new book', async () => {
    // Arrange
    const books = new BooksInMemory()

    const command = bookRequestExamples.create()
    const useCase = new CreateBookUseCase(books)

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      () => {
        const savedBook = books.books.get(command.id)
        expect(savedBook?.version).toEqual(0)
      },
      (error) => unexpected.error(error),
    )
  })

  it('should rejects to create a book with the same id', async () => {
    // Arrange
    const book = BooksExamples.available()
    const books = new BooksInMemory([book])

    const command = {
      ...bookRequestExamples.create(),
      id: book.id.value,
    }
    const useCase = new CreateBookUseCase(books)

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      (success) => unexpected.success(success),
      (error) => {
        expect(error).toBeInstanceOf(DuplicateIdError)
      },
    )
  })
})
