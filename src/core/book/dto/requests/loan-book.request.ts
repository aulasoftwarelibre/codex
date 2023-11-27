import { DeepReadonly } from 'ts-essentials'

type LoanBookRequest = DeepReadonly<{
  bookId: string
  userMail: string
}>

const LoanBookRequest = {
  with: (properties: LoanBookRequest) => properties,
}

export default LoanBookRequest
