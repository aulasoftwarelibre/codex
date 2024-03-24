import Book from '@/core/book/domain/model/book.entity'
import BookDataMapper from '@/core/book/infrastructure/persistence/book.data-mapper'
import LoanDataMapper from '@/core/loan/infrastructure/persistence/loan.data-mapper'
import User from '@/core/user/domain/model/user.entity'
import UserDataMapper from '@/core/user/infrastructure/persistence/user.data-mapper'
import prisma from '@/lib/prisma/prisma'
import BooksExamples from '@/tests/examples/books.examples'
import LoansExamples from '@/tests/examples/loans.examples'
import UsersExamples from '@/tests/examples/users.examples'

export async function createAvailableBook() {
  const book = BooksExamples.available()
  await prisma.book.create({ data: BookDataMapper.toPrisma(book) })

  return book
}

export async function createLoanedBook() {
  const book = BooksExamples.loaned()
  await prisma.book.create({ data: BookDataMapper.toPrisma(book) })

  return book
}

export async function createUser(user = UsersExamples.basic()) {
  await prisma.user.create({ data: UserDataMapper.toPrisma(user) })

  return user
}

export async function createLoan(book: Book, user: User) {
  const loan = LoansExamples.ofBookAndUser(book, user)
  await prisma.loan.create({ data: LoanDataMapper.toPrisma(loan) })

  return loan
}
