import { Prisma } from '@prisma/client'

export type ReviewType = Prisma.ReviewGetPayload<{
  include: { user: true }
}>
