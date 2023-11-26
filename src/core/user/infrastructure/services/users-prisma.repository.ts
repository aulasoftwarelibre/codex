import { PrismaClient, User as PrismaUser } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import Email from '@/core/common/domain/value-objects/email'
import FullName from '@/core/common/domain/value-objects/fullname'
import Image from '@/core/common/domain/value-objects/image'
import Role from '@/core/common/domain/value-objects/role'
import Roles from '@/core/common/domain/value-objects/roles'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'

export default class UsersPrisma implements Users {
  constructor(private readonly prisma: PrismaClient) {}

  findByEmail(email: Email): ResultAsync<User, UserNotFoundError> {
    return ResultAsync.fromPromise(
      this.prisma.user.findUniqueOrThrow({
        select: {
          email: true,
          image: true,
          name: true,
          roles: true,
        },
        where: {
          email: email.value,
        },
      }),
      () => UserNotFoundError.withEmail(email),
    ).andThen((user) => okAsync(this.mapFromPrismaUser(user)))
  }

  save(user: User): ResultAsync<User, ApplicationError> {
    const { email, image, name, roles } = user

    return ResultAsync.fromPromise(
      this.prisma.user.upsert({
        create: {
          email: email.value,
          image: image.value,
          name: name.value,
          roles: roles.map((role) => role.value),
        },
        update: {
          image: image.value,
          name: name.value,
          roles: roles.map((role) => role.value),
        },
        where: {
          email: email.value,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(() => okAsync(user))
  }

  private mapFromPrismaUser({
    email,
    image,
    name,
    roles,
  }: Pick<PrismaUser, 'email' | 'name' | 'roles' | 'image'>) {
    return new User(
      new Email(email || ''),
      new Roles(roles.map((role) => new Role(role))),
      new FullName(name || ''),
      new Image(image || ''),
    )
  }
}
