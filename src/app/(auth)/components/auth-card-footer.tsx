import { CardFooter } from '@nextui-org/card'
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
      <p className="text-center text-small">{children}</p>
    </CardFooter>
  )
}
