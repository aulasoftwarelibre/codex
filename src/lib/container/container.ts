import FindUserUseCase from '@/core/user/application/find-user.use-case'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import UsersPrisma from '@/core/user/infrastructure/services/users-prisma.repository'
import prisma from '@/lib/prisma/prisma'

const Container = {
  init: () => {
    const users = new UsersPrisma(prisma)

    return {
      findUser: new FindUserUseCase(users),
      updateUser: new UpdateUserUseCase(users),
    }
  },
}

export default Container.init()
