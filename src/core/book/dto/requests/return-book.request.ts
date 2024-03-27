import { DeepReadonly } from 'ts-essentials'

type ReturnBookRequest = DeepReadonly<{
  bookId: string
}>

const ReturnBookRequest = {
  with: (properties: ReturnBookRequest) => properties,
}

export { ReturnBookRequest }
