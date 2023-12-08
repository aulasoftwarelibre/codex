import { PrismaClient } from '@prisma/client'
import { ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import Publisher from '@/core/common/domain/publisher/publisher'
import stop from '@/core/common/utils/stop'
import User from '@/core/user/domain/model/user.entity'
import UserDataMapper from '@/core/user/infrastructure/persistence/user.data-mapper'

export default class UserPublisher extends Publisher<User> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  create(user: User): ResultAsync<void, ApplicationError> {
    const data = UserDataMapper.toPrisma(user)

    return ResultAsync.fromPromise(
      this.prisma.user.create({
        data,
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(stop)
  }

  update(user: User, version: number): ResultAsync<void, ApplicationError> {
    const { id, ...data } = UserDataMapper.toPrisma(user)

    return ResultAsync.fromPromise(
      this.prisma.user.update({
        data,
        where: {
          id,
          version,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(stop)
  }
}
