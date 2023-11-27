import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'
import BooksExamples from '@/tests/examples/books.examples'

import LoanBookRequest from '../dto/requests/loan-book.request'
import LoansInMemory from '../infrastructure/services/loans-in-memory.repository'
import LoanBookUseCase from './loan-book.use-case'

describe('Loan book', () => {
  it.skip('should loan a available book to a user', async () => {
    // Arrange
    // Requires:
    //    book repository with a book
    //    current session service with a logged user
    //    loan book service
    // Act
    // Run the command: load book x to user y
    //    Logic:
    //      1. check book is still available
    //      2. call to book.loanTo(user, loanService)
    //      3. mark the book as no available
    //    Internal logic to avoid race condition. Inside a transaction:
    //      1. create the loan tuple
    //      1. update the book to assign the loan only if book is still available (where clause)
    // Assert
    // Book is not available and loan exists in loan table
  })

  it('should loan a available book to a user', async () => {
    // Arrange
    const book = BooksExamples.basic()
    const books = BooksInMemory.withBooks([book])

    const loans = new LoansInMemory()

    const useCase = new LoanBookUseCase(books, loans)

    const command = LoanBookRequest.with({
      bookId: book.id.value,
      userMail: 'usermail',
    })

    // Act
    const result = await useCase.with(command)

    // Assert
    result.match(
      (_book) => {
        const loanedBook = books.books.get(_book.id.value)
        expect(loanedBook.isLoaned).toBeTruthy()
      },
      (error) => unexpected.error(error),
    )
  })
})
