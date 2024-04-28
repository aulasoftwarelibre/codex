'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Toaster
          toastOptions={{
            style: {
              background: 'none',
              boxShadow: 'none',
            },
          }}
        />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
