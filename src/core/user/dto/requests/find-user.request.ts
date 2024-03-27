import { DeepReadonly } from 'ts-essentials'

type FindUserRequest = DeepReadonly<{
  email: string
}>

const FindUserRequest = {
  with: (properties: FindUserRequest): FindUserRequest => properties,
}

export { FindUserRequest }
