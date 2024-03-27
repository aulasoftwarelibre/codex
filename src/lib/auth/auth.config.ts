import { NextAuthFirewallConfig } from '@aulasoftwarelibre/next-auth-firewall'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { EmailProvider } from '@/lib/auth/providers/email.provider'
import { prisma } from '@/lib/prisma/prisma'

export const authConfig = {
  accessControl: [
    {
      path: '^/admin',
      roles: 'ROLE_ADMIN',
    },
    {
      path: '^/books/?$',
      roles: 'PUBLIC_ACCESS',
    },
    {
      path: '^/books/new',
      roles: 'ROLE_ADMIN',
    },
    {
      path: '^/books/\\w+/edit',
      roles: 'ROLE_ADMIN',
    },
    {
      path: '^/settings',
      roles: 'IS_AUTHENTICATED',
    },
    {
      path: '^/',
      roles: 'PUBLIC_ACCESS',
    },
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    verifyRequest: '/verify',
  },
  providers: [
    EmailProvider({
      from: process.env.MAIL_FROM as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
} as NextAuthFirewallConfig
