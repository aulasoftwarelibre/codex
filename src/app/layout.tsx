import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import Header from '@/components/Header/Header'
import { Providers } from '@/components/Providers/Providers'
import { auth } from '@/lib/auth/auth'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Codex',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header session={session} />
          <div className="container mx-auto pt-5">{children}</div>
        </Providers>
      </body>
    </html>
  )
}