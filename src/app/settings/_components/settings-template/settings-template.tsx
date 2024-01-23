'use client'

import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface SettingTab {
  target: string
  title: string
}

interface SettingsTemplateProperties {
  children: ReactNode
  pathname: string
  tabs: SettingTab[]
}

export default function SettingsTemplate(
  properties: SettingsTemplateProperties,
) {
  const { children, pathname, tabs } = properties
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
            items={tabs}
          >
            {({ target, title }) => (
              <Tab
                key={`/settings/${target}`}
                href={`/settings/${target}`}
                title={title}
                as={NextLink}
              />
            )}
          </Tabs>
          <div className="mt-4">{children}</div>
        </CardBody>
      </Card>
    </>
  )
}
