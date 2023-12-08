import { Prisma } from '@prisma/client'

type UserType = Prisma.UserGetPayload<true>

export default UserType
