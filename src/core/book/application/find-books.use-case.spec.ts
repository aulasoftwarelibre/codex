import { ulid } from 'ulid'

import FindBooksUseCase from '@/core/book/application/find-books.use-case'
import { BookDTO } from '@/core/book/application/types'
import Book from '@/core/book/domain/model/book.entity'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'

describe('FindBooksUseCase', () => {
  it('should get all books', async () => {
    // Arrange
    const books = new BooksInMemory()
    const book = Book.create({
      authors: ['Jane Doe'],
      id: ulid(),
      image: 'http://example.com/book.jpeg',
      title: 'A book',
    })._unsafeUnwrap()
    books.books.set(book.id.value, book)

    const useCase = new FindBooksUseCase(books)

    // Act
    const result = await useCase.with()

    // Assert
    result.match(
      (_books) => {
        expect(_books).toEqual([BookDTO.fromModel(book)])
      },
      (error) => unexpected.error(error),
    )
  })
})
