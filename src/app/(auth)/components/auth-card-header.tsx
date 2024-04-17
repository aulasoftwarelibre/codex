import { CardBody } from '@nextui-org/card'
import React, { ReactNode } from 'react'

interface AuthModalHeaderProperties {
  children: ReactNode
  title: string
}

export function AuthCardHeader(properties: AuthModalHeaderProperties) {
  const { children, title } = { ...properties }
  return (
    <CardBody className="flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">
        {title}
        <span className="block text-lg font-normal uppercase">Codex</span>
      </h1>

      <div className="mx-auto flex min-w-[300px] flex-col gap-4">
        {children}
      </div>
    </CardBody>
  )
}
