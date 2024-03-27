import { DeepReadonly } from 'ts-essentials'

type UpdateUserRequest = DeepReadonly<{
  email: string
  image: string
  name: string
}>

const UpdateUserRequest = {
  with: (properties: UpdateUserRequest) => properties,
}

export { UpdateUserRequest }
