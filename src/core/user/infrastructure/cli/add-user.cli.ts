#!/usr/bin/env node
import 'dotenv/config'

import { ulid } from 'ulid'

import UserDataMapper from '@/core/user/infrastructure/persistence/user.data-mapper'
import prisma from '@/lib/prisma/prisma'
import gravatar from '@/lib/utils/gravatar'

async function main() {
  console.info('Creating admin...')

  if (process.argv.length !== 4 || !process.argv[2] || !process.argv[3]) {
    console.error(`Error: missing parameters.`)
    console.error(`Usage: npm cli:user:admin "Full name" "email"`)

    process.exit(1)
  }

  const name = process.argv[2] || ''
  const email = process.argv[3] || ''

  const user = UserDataMapper.toModel({
    email,
    id: ulid().toLowerCase(),
    image: gravatar(email),
    name,
    roles: ['ROLE_USER', 'ROLE_ADMIN'],
    version: 0,
  })

  await prisma.user.create({
    data: {
      ...UserDataMapper.toPrisma(user),
      emailVerified: new Date(),
    },
  })
}

main()
  .then(() => console.info('Done'))
  .catch((error) => console.error(error))
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .finally(() => prisma.$disconnect())
