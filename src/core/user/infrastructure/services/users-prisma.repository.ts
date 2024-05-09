import { PrismaClient } from '@prisma/client'

import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { Email } from '@/core/common/domain/value-objects/email'
import { User } from '@/core/user/domain/model/user.entity'
import { Users } from '@/core/user/domain/services/users.repository'
import { UserDataMapper } from '@/core/user/infrastructure/persistence/user.data-mapper'
import { UserPublisher } from '@/core/user/infrastructure/persistence/user.publisher'

export class UsersPrisma implements Users {
  private publisher: UserPublisher

  constructor(private readonly prisma: PrismaClient) {
    this.publisher = new UserPublisher(prisma)
  }

  async findByEmail(email: Email): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: email.value,
        },
      })

      return UserDataMapper.toModel(user)
    } catch {
      throw new NotFoundError('user_email_not_found')
    }
  }

  async save(user: User): Promise<void> {
    return this.publisher.mergeObjectContext(user).commit()
  }
}
