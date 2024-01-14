import { describe, expect, it } from 'vitest'

import LoanBookUseCase from '@/core/book/application/loan-book-use.case'
import LoanBookRequest from '@/core/book/dto/requests/loan-book.request'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import ApplicationError from '@/core/common/domain/errors/application-error'
import LoanBookService from '@/core/loan/domain/services/loan-book.service'
import LoansInMemory from '@/core/loan/infrastructure/services/loans-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'
import BooksExamples from '@/tests/examples/books.examples'
import LoansExamples from '@/tests/examples/loans.examples'
import UsersExamples from '@/tests/examples/users.examples'

describe('Loan book', () => {
  it('should loan a available book to a user', async () => {
    // Arrange
    const book = BooksExamples.available()
    const books = new BooksInMemory([book])

    const user = UsersExamples.basic()

    const loans = new LoansInMemory([])

    const loanBookService = new LoanBookService(loans)

    const useCase = new LoanBookUseCase(books, loanBookService)
    const request = LoanBookRequest.with({
      bookId: book.id.value,
      userId: user.id.value,
    })

    // Act
    const result = useCase.with(request)

    // Assert
    await result.match(
      () => {
        expect(loans.loans).toHaveLength(1)
      },
      (error) => unexpected.error(error),
    )
  })

  it('should not loan an unavailable book to a user', async () => {
    // Arrange
    const book = BooksExamples.loaned()
    const books = new BooksInMemory([book])

    const user = UsersExamples.basic()

    const loan = LoansExamples.ofBookAndUser(book, user)
    const loans = new LoansInMemory([loan])

    const loanBookService = new LoanBookService(loans)

    const useCase = new LoanBookUseCase(books, loanBookService)
    const request = LoanBookRequest.with({
      bookId: book.id.value,
      userId: user.id.value,
    })

    // Act
    const result = useCase.with(request)

    // Assert
    await result.match(
      (_ok) => unexpected.success(_ok),
      (_error) => {
        expect(_error).instanceof(ApplicationError)
      },
    )
  })
})
