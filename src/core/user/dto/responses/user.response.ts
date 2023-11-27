import { DeepReadonly } from 'ts-essentials'

import User from '@/core/user/domain/model/user.entity'

type UserResponse = DeepReadonly<{
  email: string
  image: string
  name: string
  roles: string[]
}>

const UserResponse = {
  fromModel: (user: User): UserResponse => ({
    email: user.email.value,
    image: user.image.value,
    name: user.name.value,
    roles: user.roles.map((role) => role.value),
  }),
  with: (properties: UserResponse) => properties,
}

export default UserResponse
