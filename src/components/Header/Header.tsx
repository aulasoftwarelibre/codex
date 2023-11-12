'use client'

import { Session } from '@auth/core/types'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import Link from 'next/link'

import HeaderAuthenticatedMenu from '@/components/Header/HeaderAuthenticatedMenu'
import HeaderUnauthenticatedMenu from '@/components/Header/HeaderUnauthenticatedMenu'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

interface HeaderProps {
  session: Session | null
}

function useController(props: HeaderProps) {
  return { ...props }
}

export default function Header(props: HeaderProps) {
  const { session } = useController(props)

  const AuthNavbarItem = session?.user ? (
    <HeaderAuthenticatedMenu session={session} />
  ) : (
    <HeaderUnauthenticatedMenu />
  )

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link href="/" className="text-2xl font-extrabold text-inherit">
            Codex
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>{AuthNavbarItem}</NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
