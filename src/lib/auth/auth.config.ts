import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthConfig } from 'next-auth'

import EmailProvider from '@/lib/auth/providers/email'
import prisma from '@/lib/prisma/prisma'

const authConfig = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnSecuredPage = nextUrl.pathname.startsWith('/c/')
      if (isOnSecuredPage) {
        return isLoggedIn
      }

      if (
        (isLoggedIn && nextUrl.pathname.startsWith('/signin')) ||
        (!isLoggedIn && nextUrl.pathname.startsWith('/signout'))
      ) {
        return Response.redirect(new URL('/', nextUrl))
      }

      return true
    },
  },
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
} satisfies NextAuthConfig

export default authConfig as unknown as NextAuthConfig
