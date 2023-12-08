import { describe, expect, it } from 'vitest'

import ReturnBookUseCase from '@/core/book/application/return-book.use-case'
import ReturnBookRequest from '@/core/book/dto/requests/return-book.request'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import ReturnBookService from '@/core/loan/domain/services/return-book.service'
import LoansInMemory from '@/core/loan/infrastructure/services/loans-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'
import BooksExamples from '@/tests/examples/books.examples'
import LoansExamples from '@/tests/examples/loans.examples'
import UsersExamples from '@/tests/examples/users.examples'

describe('Return book', () => {
  it('should return a loaned book', async () => {
    // Arrange
    const book = BooksExamples.loaned()
    const books = new BooksInMemory([book])

    const user = UsersExamples.basic()

    const loan = LoansExamples.ofBookAndUser(book, user)
    const loans = new LoansInMemory([loan])

    const returnBookService = new ReturnBookService(loans)

    const useCase = new ReturnBookUseCase(books, returnBookService)
    const request = ReturnBookRequest.with({
      bookId: book.id.value,
    })

    // Act
    const result = useCase.with(request)

    // Assert
    await result.match(
      () => {
        expect(loans.loans).toHaveLength(0)
      },
      (error) => unexpected.error(error),
    )
  })
})
