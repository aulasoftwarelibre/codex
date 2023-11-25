import { PrismaClient, User as PrismaUser } from '@prisma/client'

import Email from '@/core/user/domain/model/email.value-object'
import Image from '@/core/user/domain/model/image.value-object'
import Name from '@/core/user/domain/model/name.value-object'
import Role from '@/core/user/domain/model/role.value-object'
import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'

export default class UsersPrisma implements Users {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      select: {
        email: true,
        image: true,
        name: true,
        roles: true,
      },
      where: {
        email,
      },
    })

    if (!user) {
      return undefined
    }

    return this.mapFromPrismaUser(user)
  }

  private mapFromPrismaUser({
    email,
    image,
    name,
    roles,
  }: Pick<PrismaUser, 'email' | 'name' | 'roles' | 'image'>) {
    return new User(
      new Name(name || ''),
      roles.map((role) => new Role(role)),
      new Email(email || ''),
      new Image(image || ''),
    )
  }

  async save(user: User): Promise<void> {
    const { email, image, name, roles } = user

    await this.prisma.user.upsert({
      create: {
        email,
        image,
        name,
        roles,
      },
      update: {
        image,
        name,
        roles,
      },
      where: {
        email,
      },
    })
  }
}
