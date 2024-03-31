import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { ReactNode } from 'react'

interface SettingsFormProperties {
  children: ReactNode
  title: string
}

export function SettingsForm(properties: SettingsFormProperties) {
  const { children, title } = properties

  return (
    <>
      <section role="region">
        <Card radius="sm" className="border-1 border-default-200 p-4">
          <CardHeader className="text-2xl font-bold">
            <h2>{title}</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-y-4">{children}</CardBody>
        </Card>
      </section>
    </>
  )
}
