import { DeepReadonly } from 'ts-essentials'

type EditBookPayload = {
  authors: string[]
  id: string
  image: string
  title: string
}

type EditBookRequest = DeepReadonly<EditBookPayload>

const EditBookRequest = {
  with: (properties: EditBookPayload): EditBookRequest => properties,
}

export { EditBookRequest }
