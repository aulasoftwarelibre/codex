import { describe, expect, test as it } from 'vitest'

import CreateBookUseCase from '@/core/book/application/create-book.use-case'
import BookIdAlreadyExistsError from '@/core/book/domain/errors/book-id-already-exists.error'
import CreateBookRequest from '@/core/book/dto/requests/create-book.request'
import BookResponse from '@/core/book/dto/responses/book.response'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'

import BooksExamples from '../../../../tests/examples/books.examples'

describe('CreateBookUseCase', () => {
  it('should create a new book', async () => {
    // Arrange
    const books = new BooksInMemory()
    const book = BooksExamples.basic()

    const command = CreateBookRequest.with(
      BookResponse.fromModel(book) satisfies CreateBookRequest,
    )
    const useCase = new CreateBookUseCase(books)

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      (_book) => {
        const savedBook = books.books.get(_book.id.value)
        expect(savedBook).toEqual(_book)
      },
      (error) => unexpected.error(error),
    )
  })

  it('should rejects to create a book with the same id', async () => {
    // Arrange
    const books = new BooksInMemory()
    const book = BooksExamples.basic()
    books.books.set(book.id.value, book)

    const command = CreateBookRequest.with(
      BookResponse.fromModel(book) satisfies CreateBookRequest,
    )
    const useCase = new CreateBookUseCase(books)

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      (success) => unexpected.success(success),
      (error) => {
        expect(error).toBeInstanceOf(BookIdAlreadyExistsError)
      },
    )
  })
})
