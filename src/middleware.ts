import NextAuthFirewall from '@aulasoftwarelibre/next-auth-firewall'

import authConfig from '@/lib/auth/auth.config'

export default NextAuthFirewall(authConfig).auth

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
