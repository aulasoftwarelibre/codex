'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const TABS = [
  {
    target: 'reviews',
    title: 'Reseñas',
  },
  {
    target: 'loans',
    title: 'Préstamos',
  },
] as ViewTab[]

interface ViewTab {
  target: string
  title: string
}

interface ViewTabsProperties {
  children: ReactNode
  id: string
}

export function BookViewTabs({ children, id }: ViewTabsProperties) {
  const pathname = usePathname()

  return (
    <>
      <Tabs
        aria-label="Opciones"
        classNames={{
          tab: 'max-w-fit',
          tabList: 'w-full',
        }}
        items={TABS}
        selectedKey={pathname}
      >
        {({ target, title }) => (
          <Tab
            as={NextLink}
            href={`/books/${id}/${target}`}
            key={`/books/${id}/${target}`}
            title={title}
          />
        )}
      </Tabs>
      <div className="mt-4">{children}</div>
    </>
  )
}
