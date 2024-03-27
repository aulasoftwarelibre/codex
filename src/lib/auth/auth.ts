import NextAuthFirewall from '@aulasoftwarelibre/next-auth-firewall'

import { authConfig } from '@/lib/auth/auth.config'

export const {
  auth,
  firewallHandler,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuthFirewall(authConfig)
