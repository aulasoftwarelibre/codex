import { PrismaClient } from '@prisma/client'

import { UserResponse } from '@/core/user/dto/responses/user.response'
import { UserType } from '@/core/user/infrastructure/persistence/user.type'

export class FindAllUsersQuery {
  constructor(private readonly prisma: PrismaClient) {}

  async with(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany({})

    return this.mapToUserResponse(users)
  }

  private mapToUserResponse(users: UserType[]) {
    return users.map((user) => UserResponse.fromType(user))
  }
}
