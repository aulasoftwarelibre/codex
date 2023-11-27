import FindBooksUseCase from '@/core/book/application/find-books.use-case'
import BookResponse from '@/core/book/dto/responses/book.response'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'
import BooksExamples from '@/tests/examples/books.examples'

describe('FindBooksUseCase', () => {
  it('should get all books', async () => {
    // Arrange
    const books = new BooksInMemory()
    const book = BooksExamples.basic()
    books.books.set(book.id.value, book)

    const useCase = new FindBooksUseCase(books)

    // Act
    const result = await useCase.with()

    // Assert
    result.match(
      (_books) => {
        expect(_books).toEqual([BookResponse.fromModel(book)])
      },
      (error) => unexpected.error(error),
    )
  })
})
