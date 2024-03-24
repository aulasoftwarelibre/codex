import { afterEach, beforeEach } from 'vitest'

import prisma from '@/lib/prisma/prisma'

beforeEach(async () => {
  await prisma.$executeRaw`BEGIN`
})

afterEach(async () => {
  await prisma.$executeRaw`ROLLBACK`
})
