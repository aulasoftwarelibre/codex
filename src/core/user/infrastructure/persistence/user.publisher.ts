import { PrismaClient } from '@prisma/client'
import { ResultAsync } from 'neverthrow'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Publisher } from '@/core/common/domain/publisher/publisher'
import { ignore } from '@/core/common/utils/ignore'
import { User } from '@/core/user/domain/model/user.entity'
import { UserDataMapper } from '@/core/user/infrastructure/persistence/user.data-mapper'

export class UserPublisher extends Publisher<User> {
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
    ).andThen(ignore)
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
    ).andThen(ignore)
  }
}
