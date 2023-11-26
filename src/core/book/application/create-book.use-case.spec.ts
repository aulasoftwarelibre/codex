import { ulid } from 'ulid'

import CreateBookUseCase from '@/core/book/application/create-book.use-case'
import { CreateBookCommand } from '@/core/book/application/types'
import BookIdAlreadyExistsError from '@/core/book/domain/errors/book-id-already-exists.error'
import Book from '@/core/book/domain/model/book.entity'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'

describe('CreateBookUseCase', () => {
  it('should create a new book', async () => {
    // Arrange
    const books = new BooksInMemory()
    const book = Book.create({
      authors: ['Jane Doe'],
      id: ulid(),
      image: 'http://example.com/book.jpeg',
      title: 'A book',
    })._unsafeUnwrap()

    const command = CreateBookCommand.with({
      authors: book.authors.map((author) => author.value),
      id: book.id.value,
      image: book.image.value,
      title: book.title.value,
    })
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
    const book = Book.create({
      authors: ['Jane Doe'],
      id: ulid(),
      image: 'http://example.com/book.jpeg',
      title: 'A book',
    })._unsafeUnwrap()
    books.books.set(book.id.value, book)

    const command = CreateBookCommand.with({
      authors: book.authors.map((author) => author.value),
      id: book.id.value,
      image: book.image.value,
      title: book.title.value,
    })
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
