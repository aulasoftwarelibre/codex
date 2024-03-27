import { DeepReadonly } from 'ts-essentials'

import { User } from '@/core/user/domain/model/user.entity'
import { UserType } from '@/core/user/infrastructure/persistence/user.type'
import { gravatar } from '@/lib/utils/gravatar'

type UserResponse = DeepReadonly<{
  email: string
  id: string
  image: string
  name: string
  roles: string[]
}>

const UserResponse = {
  fromModel: (user: User): UserResponse => ({
    email: user.email.value,
    id: user.id.value,
    image: user.image.value,
    name: user.name.value,
    roles: user.roles.map((role) => role.value),
  }),
  fromType: (user: UserType): UserResponse => ({
    email: user.email ?? '',
    id: user.id,
    image: user.image ?? gravatar(user.email),
    name: user.name ?? '',
    roles: user.roles,
  }),
  with: (properties: UserResponse) => properties,
}

export { UserResponse }
