import { DeepReadonly } from 'ts-essentials'

type CreateBookRequest = DeepReadonly<{
  authors: string[]
  id: string
  image: string
  title: string
}>

const CreateBookRequest = {
  with: (properties: CreateBookRequest) => properties,
}

export default CreateBookRequest
