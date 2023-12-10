import { Prisma } from '@prisma/client'

type LoanRegistryType = Prisma.LoanRegistryGetPayload<{
  include: { user: true }
}>

export default LoanRegistryType
