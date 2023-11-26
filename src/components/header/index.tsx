'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import Link from 'next/link'

import HeaderAuthenticatedMenu from '@/components/header/header-authenticated-menu'
import HeaderUnauthenticatedMenu from '@/components/header/header-unauthenticated-menu'
import ThemeSwitcher from '@/components/theme-switcher'
import { UserDTO } from '@/core/user/application/types'

interface HeaderProperties {
  user?: UserDTO
}

export default function Header(properties: HeaderProperties) {
  const { user } = properties

  const AuthNavbarItem = user ? (
    <HeaderAuthenticatedMenu user={user} />
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
