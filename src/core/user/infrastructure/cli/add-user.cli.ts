#!/usr/bin/env node
import 'dotenv/config'

import { ulid } from 'ulid'

import UserDataMapper from '@/core/user/infrastructure/persistence/user.data-mapper'
import prisma from '@/lib/prisma/prisma'
import gravatar from '@/lib/utils/gravatar'

async function main() {
  if (
    process.argv.length !== 5 ||
    !['admin', 'member'].includes(process.argv[2] as string) ||
    !process.argv[3] ||
    !process.argv[4]
  ) {
    console.error(`Error: missing parameters.`)
    console.error(`Usage: npm cli:user:admin ROLE "Full name" "email"`)
    console.error(`ROLE must be "admin" or "member".`)

    process.exit(1)
  }

  console.info(`Creating ${process.argv[2] as string}...`)

  const roles =
    process.argv[2] === 'member'
      ? ['ROLE_USER', 'ROLE_MEMBER']
      : ['ROLE_USER', 'ROLE_ADMIN']
  const name = process.argv[3] || ''
  const email = process.argv[4] || ''

  const user = UserDataMapper.toModel({
    email,
    id: ulid().toLowerCase(),
    image: gravatar(email),
    name,
    roles,
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
