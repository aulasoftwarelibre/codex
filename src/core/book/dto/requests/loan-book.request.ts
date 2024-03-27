import { DeepReadonly } from 'ts-essentials'

type LoanBookRequest = DeepReadonly<{
  bookId: string
  userId: string
}>

const LoanBookRequest = {
  with: (properties: LoanBookRequest) => properties,
}

export { LoanBookRequest }
