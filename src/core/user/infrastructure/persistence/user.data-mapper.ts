import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { Image } from '@/core/common/domain/value-objects/image'
import { Role } from '@/core/common/domain/value-objects/role'
import { Roles } from '@/core/common/domain/value-objects/roles'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { User } from '@/core/user/domain/model/user.entity'
import { UserType } from '@/core/user/infrastructure/persistence/user.type'

const UserDataMapper = {
  toModel: (user: Omit<UserType, 'emailVerified'>): User =>
    User.withVersion(
      user.version,
      new UserId(user.id),
      new Email(user.email || ''),
      new Roles(user.roles.map((role) => new Role(role))),
      new FullName(user.name || ''),
      new Image(user.image || ''),
    ),
  toPrisma: (user: User): Omit<UserType, 'emailVerified'> => ({
    email: user.email.value,
    id: user.id.value,
    image: user.image.value,
    name: user.name.value,
    roles: user.roles.map((role) => role.value),
    version: user.version,
  }),
} as const

export { UserDataMapper }
