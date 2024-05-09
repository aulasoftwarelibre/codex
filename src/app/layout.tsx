import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'

import { Footer } from '@/app/components/footer'
import { Header } from '@/app/components/header'
import { UnauthorizedAlert } from '@/app/components/unauthorized-alert'
import { Providers } from '@/app/providers'
import { findUser } from '@/core/user/infrastructure/actions/find-user'
import { auth } from '@/lib/auth/auth'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Codex',
}

interface RootLayoutProperties {
  children: ReactNode
  modal: ReactNode
}

export default async function RootLayout({
  children,
  modal,
}: RootLayoutProperties) {
  const session = await auth()
  const user = await findUser(session?.user?.email || '')

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-slate-500 antialiased dark:bg-slate-900 dark:text-slate-400`}
      >
        <Providers>
          {modal}
          <Header user={user} />
          <div className="mt-4 flex min-h-[calc(100vh-185px)] flex-col">
            <UnauthorizedAlert user={user} />
            <div className="container mx-auto flex-grow py-5">{children}</div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
