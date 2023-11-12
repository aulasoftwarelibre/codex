import { CardBody } from '@nextui-org/react'
import React, { ReactNode } from 'react'

interface AuthModalHeaderProps {
  children: ReactNode
  title: string
}

export default function AuthModalHeader(props: AuthModalHeaderProps) {
  const { children, title } = { ...props }
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
