import { Card, CardHeader } from '@nextui-org/react'
import React, { ReactNode } from 'react'

import ThemeImage from '@/components/ThemeImage/ThemeImage'

interface AuthModalProps {
  children: ReactNode
}

export default function AuthModal(props: AuthModalProps) {
  const { children } = { ...props }
  return (
    <>
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <Card className="max-w-[650px] w-[650px]">
          <CardHeader>
            <ThemeImage
              className="mx-auto block"
              width={130}
              height={130}
              alt="Logo del Aula de Software Libre"
              srcDark="/images/logoasl-white.png"
              srcLight="/images/logoasl.png"
            />
          </CardHeader>
          {children}
        </Card>
      </div>
    </>
  )
}
