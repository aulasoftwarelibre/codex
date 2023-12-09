import { describe, expect, it } from 'vitest'

import EditBookUseCase from '@/core/book/application/edit-book.use-case'
import EditBookRequest from '@/core/book/dto/requests/edit-book.request'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import unexpected from '@/lib/utils/unexpected'
import BooksExamples from '@/tests/examples/books.examples'

describe('EditBookUseCase', () => {
  it('should edit a book', async () => {
    // Arrange
    const book = BooksExamples.available()
    const books = new BooksInMemory([book])

    const command = EditBookRequest.with({
      authors: book.authors.map((author) => author.value),
      id: book.id.value,
      image: book.image.value,
      title: 'A updated title',
    })
    const useCase = new EditBookUseCase(books)

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      () => {
        const savedBook = books.books.get(command.id)
        expect(savedBook?.version).toEqual(1)
        expect(savedBook?.title.value).toEqual(command.title)
      },
      (error) => unexpected.error(error),
    )
  })

  it('should returns an error if book does not exists', async () => {
    // Arrange
    const book = BooksExamples.available()
    const books = new BooksInMemory()

    const command = EditBookRequest.with({
      authors: book.authors.map((author) => author.value),
      id: book.id.value,
      image: book.image.value,
      title: 'A updated title',
    })
    const useCase = new EditBookUseCase(books)

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      (_ok) => unexpected.success(_ok),
      (error) => {
        expect(error).toBeInstanceOf(NotFoundError)
      },
    )
  })
})
