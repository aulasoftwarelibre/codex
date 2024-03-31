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

export function SettingsTemplate(properties: SettingsTemplateProperties) {
  const { children, pathname, tabs } = properties
  return (
    <>
      <Card className="flex w-full flex-col gap-2 p-1">
        <CardHeader>
          <div className="h1 text-2xl font-bold">Ajustes de usuario</div>
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
