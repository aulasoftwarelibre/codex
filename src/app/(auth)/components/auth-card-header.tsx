import { CardBody } from '@nextui-org/react'
import React, { ReactNode } from 'react'

interface AuthModalHeaderProperties {
  children: ReactNode
  title: string
}

export function AuthCardHeader(properties: AuthModalHeaderProperties) {
  const { children, title } = { ...properties }
  return (
    <CardBody className="flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">
        {title}
        <span className="text-lg font-normal uppercase block">Codex</span>
      </h1>

      <div className="flex flex-col mx-auto min-w-[300px] gap-4">
        {children}
      </div>
    </CardBody>
  )
}
