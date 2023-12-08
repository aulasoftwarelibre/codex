import CreateBookUseCase from '@/core/book/application/create-book.use-case'
import { LoanBookUseCase } from '@/core/book/application/loan-book-use.case'
import ReturnBookUseCase from '@/core/book/application/return-book.use-case'
import FindAllBooksQuery from '@/core/book/infrastructure/queries/find-all-books.query'
import FindBookQuery from '@/core/book/infrastructure/queries/find-book.query'
import BooksPrisma from '@/core/book/infrastructure/services/books-prisma.repository'
import LoanBookService from '@/core/loan/domain/services/loan-book.service'
import ReturnBookService from '@/core/loan/domain/services/return-book.service'
import LoansPrisma from '@/core/loan/infrastructure/services/loans-prisma.repository'
import FindUserUseCase from '@/core/user/application/find-user.use-case'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import UsersPrisma from '@/core/user/infrastructure/services/users-prisma.repository'
import prisma from '@/lib/prisma/prisma'

const Container = {
  init: () => {
    const users = new UsersPrisma(prisma)
    const books = new BooksPrisma(prisma)
    const loans = new LoansPrisma(prisma)
    const loanBookService = new LoanBookService(loans)
    const returnBookService = new ReturnBookService(loans)

    return {
      createBook: new CreateBookUseCase(books),
      findBook: new FindBookQuery(prisma),
      findBooks: new FindAllBooksQuery(prisma),
      findUser: new FindUserUseCase(users),
      loanBook: new LoanBookUseCase(books, loanBookService),
      returnBook: new ReturnBookUseCase(books, returnBookService),
      updateUser: new UpdateUserUseCase(users),
    }
  },
}

export default Container.init()
