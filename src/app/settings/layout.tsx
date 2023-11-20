'use client'

import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <Card className="flex flex-col gap-2 w-full p-1">
        <CardHeader>
          <div className="h1 font-bold text-2xl">Ajustes de usuario</div>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <Tabs
            size="lg"
            aria-label="Options"
            selectedKey={pathname}
            classNames={{
              tab: 'max-w-fit',
              tabList: 'w-full',
            }}
          >
            <Tab
              key="/settings/profile"
              href="/settings/profile"
              title="Perfil"
              as={NextLink}
            />
          </Tabs>
          <div className="mt-4">{children}</div>
        </CardBody>
      </Card>
    </>
  )
}
