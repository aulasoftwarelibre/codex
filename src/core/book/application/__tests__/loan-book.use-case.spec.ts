import { describe, expect, it } from 'vitest'

import { LoanBookRequest } from '@/core/book/dto/requests/loan-book.request'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
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
    await container.loanBook.with(request)

    // Assert
    expect(await prisma.loan.count()).toBe(1)
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
    const result = async () => container.loanBook.with(request)

    // Assert
    expect(result).rejects.toThrowError()
  })
})
