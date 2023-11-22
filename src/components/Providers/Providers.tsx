'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
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
