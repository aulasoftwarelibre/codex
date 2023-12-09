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
import Logo from '@/components/header/logo'
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
          <Logo className="w-8 h-8 fill-slate-500 stroke-2 mr-1" />
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
