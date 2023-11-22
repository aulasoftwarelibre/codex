import CreateBookUseCase from '@/core/book/application/create-book.use-case'
import FindBooksUseCase from '@/core/book/application/find-books.use-case'
import BooksInMemory from '@/core/book/infrastructure/services/books-in-memory.retository'
import FindUserUseCase from '@/core/user/application/find-user.use-case'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import UsersPrisma from '@/core/user/infrastructure/services/users-prisma.repository'
import prisma from '@/lib/prisma/prisma'

const Container = {
  init: () => {
    const users = new UsersPrisma(prisma)
    const books = new BooksInMemory()
    return {
      findBooks: new FindBooksUseCase(books),
      createBook: new CreateBookUseCase(books),
      findUser: new FindUserUseCase(users),
      updateUser: new UpdateUserUseCase(users),
    }
  },
}

export default Container.init()
