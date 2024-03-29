'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export type SubmitButtonProperties = React.ComponentProps<typeof Button>

export function SubmitButton(properties: SubmitButtonProperties) {
  const { pending } = useFormStatus()
  const { children = 'Enviar' } = properties

  return (
    <>
      <Button
        type="submit"
        radius="none"
        color="primary"
        aria-disabled={pending}
        {...properties}
      >
        {children}
      </Button>
    </>
  )
}
