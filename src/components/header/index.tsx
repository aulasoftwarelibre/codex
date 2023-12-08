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
import UserResponse from '@/core/user/dto/responses/user.response'

interface HeaderProperties {
  user?: UserResponse
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
      <Navbar position="static">
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
