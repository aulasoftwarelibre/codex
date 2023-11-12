import { CardFooter } from '@nextui-org/react'
import React, { ReactNode } from 'react'

interface AuthModalFooterProps {
  children: ReactNode
}

function useController(props: AuthModalFooterProps) {
  return { ...props }
}

export default function AuthModalFooter(props: AuthModalFooterProps) {
  const { children } = useController(props)
  return (
    <CardFooter>
      <p className="text-small text-center">{children}</p>
    </CardFooter>
  )
}
