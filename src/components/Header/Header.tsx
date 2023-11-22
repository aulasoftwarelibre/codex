'use client'

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
import { FindUserResponse } from '@/core/user/application/types'

interface HeaderProps {
  user: FindUserResponse | null
}

export default function Header(props: HeaderProps) {
  const { user } = props

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
