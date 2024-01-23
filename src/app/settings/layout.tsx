'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import SettingsTemplate from '@/app/settings/_components/settings-template/settings-template'

const TABS = [
  {
    target: 'profile',
    title: 'Perfil',
  },
]

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <SettingsTemplate pathname={pathname} tabs={TABS}>
        {children}
      </SettingsTemplate>
    </>
  )
}
