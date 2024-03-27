import { CardFooter } from '@nextui-org/react'
import React, { ReactNode } from 'react'

interface AuthModalFooterProperties {
  children: ReactNode
}

function useController(properties: AuthModalFooterProperties) {
  return { ...properties }
}

export function AuthCardFooter(properties: AuthModalFooterProperties) {
  const { children } = useController(properties)
  return (
    <CardFooter>
      <p className="text-small text-center">{children}</p>
    </CardFooter>
  )
}
