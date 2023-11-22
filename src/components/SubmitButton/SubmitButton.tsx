'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      <Button type="submit" aria-disabled={pending}>
        Enviar
      </Button>
    </>
  )
}
