'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import Link from 'next/link'

import { HeaderAuthenticatedMenu } from '@/app/components/header-authenticated-menu'
import { HeaderSearchInput } from '@/app/components/header-search-input'
import { HeaderUnauthenticatedMenu } from '@/app/components/header-unauthenticated-menu'
import { ThemeSwitcher } from '@/app/components/theme-switcher'
import { Logo } from '@/components/image/logo'
import { UserResponse } from '@/core/user/dto/responses/user.response'

interface HeaderProperties {
  user?: UserResponse
}

export function Header(properties: HeaderProperties) {
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
          <Link href="/books" className="text-2xl font-extrabold text-inherit">
            Codex
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <HeaderSearchInput />
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>{AuthNavbarItem}</NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
