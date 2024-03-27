import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { ApplicationError } from '@/core/common/domain/errors/application-error'
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

  findByEmail(email: Email): ResultAsync<User, NotFoundError> {
    return ResultAsync.fromPromise(
      this.prisma.user.findUniqueOrThrow({
        where: {
          email: email.value,
        },
      }),
      () => new NotFoundError('user_email_not_found'),
    ).andThen((user) => okAsync(UserDataMapper.toModel(user)))
  }

  save(user: User): ResultAsync<void, ApplicationError> {
    return this.publisher.mergeObjectContext(user).commit()
  }
}
