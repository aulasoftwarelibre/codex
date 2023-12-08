import { Prisma } from '@prisma/client'

type BookType = Prisma.BookGetPayload<{
  include: { loan: { include: { user: true } } }
}>

export default BookType
