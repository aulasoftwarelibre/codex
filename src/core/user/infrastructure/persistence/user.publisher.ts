import { PrismaClient } from '@prisma/client'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Publisher } from '@/core/common/domain/publisher/publisher'
import { User } from '@/core/user/domain/model/user.entity'
import { UserDataMapper } from '@/core/user/infrastructure/persistence/user.data-mapper'

export class UserPublisher extends Publisher<User> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async create(user: User): Promise<void> {
    const data = UserDataMapper.toPrisma(user)

    try {
      await this.prisma.user.create({
        data,
      })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  async update(user: User, version: number): Promise<void> {
    const { id, ...data } = UserDataMapper.toPrisma(user)

    try {
      await this.prisma.user.update({
        data,
        where: {
          id,
          version,
        },
      })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }
}
