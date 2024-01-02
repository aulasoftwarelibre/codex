import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import UserResponse from '@/core/user/dto/responses/user.response'
import UserType from '@/core/user/infrastructure/persistence/user.type'

export default class FindAllUsersQuery {
  constructor(private readonly prisma: PrismaClient) {}

  with(): ResultAsync<UserResponse[], ApplicationError> {
    return ResultAsync.fromSafePromise(this.prisma.user.findMany({})).andThen(
      (users) => this.mapToUserResponse(users),
    )
  }

  private mapToUserResponse(users: UserType[]) {
    return okAsync(users.map((user) => UserResponse.fromType(user)))
  }
}
