'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Tab, Tabs } from '@nextui-org/tabs'
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
            aria-label="Options"
            classNames={{
              tab: 'max-w-fit',
              tabList: 'w-full',
            }}
            selectedKey={pathname}
            size="lg"
          >
            <Tab
              as={NextLink}
              href="/admin/users"
              key="/admin/users"
              title="Usuarios"
            />
          </Tabs>
          <div className="mt-4">{children}</div>
        </CardBody>
      </Card>
    </>
  )
}
