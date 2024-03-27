import { Prisma } from '@prisma/client'

export type BookType = Prisma.BookGetPayload<{
  include: { loan: { include: { user: true } } }
}>
