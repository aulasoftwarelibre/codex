import { DeepReadonly } from 'ts-essentials'

import { LoanRegistryType } from '@/core/loan/infrastructure/persistence/loan-registry.type'
import { gravatar } from '@/lib/utils/gravatar'

type HistoricalLoansResponse = DeepReadonly<{
  finishedAt: Date
  id: string
  startsAt: Date
  user: {
    id: string
    image: string
    name: string
  }
}>

const HistoricalLoansResponse = {
  fromType: (loanRegistry: LoanRegistryType): HistoricalLoansResponse => {
    return {
      finishedAt: loanRegistry.finishedAt,
      id: loanRegistry.id,
      startsAt: loanRegistry.startsAt,
      user: {
        id: loanRegistry.user.id,
        image: loanRegistry.user.image || gravatar(loanRegistry.user.email),
        name: loanRegistry.user.name || '',
      },
    }
  },
}

export { HistoricalLoansResponse }
