import { Prisma } from '@prisma/client'

export type LoanRegistryType = Prisma.LoanRegistryGetPayload<{
  include: { user: true }
}>
