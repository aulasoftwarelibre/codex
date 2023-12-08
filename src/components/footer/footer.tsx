import { Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'

import ThemeImage from '@/components/theme-image'

export default function Footer() {
  return (
    <>
      <Navbar position="static" className="h-24">
        <NavbarContent justify="start">
          <NavbarItem>
            <p className="text-default-600">
              Desarrollado por el{' '}
              <Link href="https://uco.es/aulasoftwarelibre" isExternal>
                Aula de Software Libre
              </Link>
              .
            </p>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeImage
              alt="Logos"
              srcDark="/images/logos-pie-white.png"
              srcLight="/images/logos-pie.png"
              width={150}
              height={50}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
