import { Card, CardHeader } from '@nextui-org/react'
import React, { ReactNode } from 'react'

import { ThemeImage } from '@/components/image/theme-image'

interface AuthModalProperties {
  children: ReactNode
}

export function AuthCard(properties: AuthModalProperties) {
  const { children } = { ...properties }
  return (
    <>
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <Card className="w-[650px] max-w-[650px]">
          <CardHeader>
            <ThemeImage
              alt="Logo del Aula de Software Libre"
              className="mx-auto block"
              height={130}
              srcDark="/images/logoasl-white.png"
              srcLight="/images/logoasl.png"
              width={130}
            />
          </CardHeader>
          {children}
        </Card>
      </div>
    </>
  )
}
