'use client'

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormState } from 'react-dom'

import { form } from '@/components/SignOutForm/actions'

export default function SignOutForm() {
  const [, action] = useFormState(form, undefined)
  return (
    <form className="flex flex-col gap-2" action={action}>
      <Button
        size="lg"
        radius="none"
        className="w-full"
        startContent={<ArrowRightOnRectangleIcon width={24} height={24} />}
        type="submit"
      >
        <span className="font-bold">Pulsa para salir</span>
      </Button>
    </form>
  )
}
