'use client'

import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <Card className="flex w-full flex-col gap-2 p-1">
        <CardHeader>
          <div className="h1 text-2xl font-bold">Gestión de usuarios</div>
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
              key="/admin/users"
              href="/admin/users"
              title="Usuarios"
              as={NextLink}
            />
          </Tabs>
          <div className="mt-4">{children}</div>
        </CardBody>
      </Card>
    </>
  )
}
