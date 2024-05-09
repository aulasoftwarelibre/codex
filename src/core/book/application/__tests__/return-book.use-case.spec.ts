import { describe, expect, it } from 'vitest'

import { ReturnBookRequest } from '@/core/book/dto/requests/return-book.request'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import {
  createLoan,
  createLoanedBook,
  createUser,
} from '@/tests/examples/factories'

describe('Return book', () => {
  it('should return a loaned book', async () => {
    // Arrange
    const loanedBook = await createLoanedBook()
    const user = await createUser()
    await createLoan(loanedBook, user)
    const request = ReturnBookRequest.with({
      bookId: loanedBook.id.value,
    })

    // Act
    await container.returnBook.with(request)

    // Assert
    expect(await prisma.loan.count()).toBe(0)
  })
})
