import { Link } from '@nextui-org/link'
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'

import { ThemeImage } from '@/components/image/theme-image'

export function Footer() {
  return (
    <>
      <Navbar className="h-24" position="static">
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
              height={50}
              srcDark="/images/logos-pie-white.png"
              srcLight="/images/logos-pie.png"
              width={150}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
