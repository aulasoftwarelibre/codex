import NextAuth from 'next-auth'

import authConfig from '@/lib/auth/auth.config'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  update,
} = NextAuth(authConfig)
