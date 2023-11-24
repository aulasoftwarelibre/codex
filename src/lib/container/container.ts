import CreateBookUseCase from '@/core/book/application/create-book.use-case'
import FindBooksUseCase from '@/core/book/application/find-books.use-case'
import BooksPrisma from '@/core/book/infrastructure/services/books-prisma.repository'
import FindUserUseCase from '@/core/user/application/find-user.use-case'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import UsersPrisma from '@/core/user/infrastructure/services/users-prisma.repository'
import prisma from '@/lib/prisma/prisma'

const Container = {
  init: () => {
    const users = new UsersPrisma(prisma)
    const books = new BooksPrisma(prisma)

    return {
      createBook: new CreateBookUseCase(books),
      findBooks: new FindBooksUseCase(books),
      findUser: new FindUserUseCase(users),
      updateUser: new UpdateUserUseCase(users),
    }
  },
}

export default Container.init()
