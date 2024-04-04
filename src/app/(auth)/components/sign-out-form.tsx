'use client'

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import React from 'react'

import { signOutAction } from '@/app/(auth)/actions/sign-out-action'

export function SignOutForm() {
  return (
    <form action={signOutAction} className="flex flex-col gap-2">
      <Button
        className="w-full"
        radius="none"
        size="lg"
        startContent={<ArrowRightStartOnRectangleIcon height={24} width={24} />}
        type="submit"
      >
        <span className="font-bold">Pulsa para salir</span>
      </Button>
    </form>
  )
}
