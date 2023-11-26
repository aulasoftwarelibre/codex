import { DeepReadonly } from 'ts-essentials'

type FindUserCommand = DeepReadonly<{
  email: string
}>

const FindUserCommand = {
  with: (properties: FindUserCommand) => properties,
}

type UpdateUserCommand = DeepReadonly<{
  email: string
  image: string
  name: string
}>

const UpdateUserCommand = {
  with: (properties: UpdateUserCommand) => properties,
}

type UserDTO = DeepReadonly<{
  email: string
  image: string
  name: string
  roles: string[]
}>

const UserDTO = {
  with: (properties: UserDTO) => properties,
}

export { FindUserCommand, UpdateUserCommand, UserDTO }
