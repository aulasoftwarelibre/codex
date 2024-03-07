import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'
import ignore from '@/core/common/utils/ignore'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'
import UserDataMapper from '@/core/user/infrastructure/persistence/user.data-mapper'

export default class UsersPrisma implements Users {
  constructor(private readonly prisma: PrismaClient) {}

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
    const data = UserDataMapper.toPrisma(user)

    return ResultAsync.fromPromise(
      this.prisma.user.upsert({
        create: data,
        update: data,
        where: { id: data.id },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(ignore)
  }
}
