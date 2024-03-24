import { describe, expect, it } from 'vitest'

import LoanBookRequest from '@/core/book/dto/requests/loan-book.request'
import ApplicationError from '@/core/common/domain/errors/application-error'
import container from '@/lib/container'
import prisma from '@/lib/prisma/prisma'
import unexpected from '@/lib/utils/unexpected'
import {
  createAvailableBook,
  createLoan,
  createLoanedBook,
  createUser,
} from '@/tests/examples/factories'

describe('Loan book', () => {
  it('should loan a available book to a user', async () => {
    // Arrange
    const book = await createAvailableBook()
    const user = await createUser()
    const request = LoanBookRequest.with({
      bookId: book.id.value,
      userId: user.id.value,
    })

    // Act
    const result = container.loanBook.with(request)

    // Assert
    await result.match(
      async () => {
        expect(await prisma.loan.count()).toBe(1)
      },
      (error) => unexpected.error(error),
    )
  })

  it('should not loan an unavailable book to a user', async () => {
    // Arrange
    const book = await createLoanedBook()
    const user = await createUser()
    await createLoan(book, user)
    const request = LoanBookRequest.with({
      bookId: book.id.value,
      userId: user.id.value,
    })

    // Act
    const result = container.loanBook.with(request)

    // Assert
    await result.match(
      (_ok) => unexpected.success(_ok),
      (_error) => {
        expect(_error).instanceof(ApplicationError)
      },
    )
  })
})
