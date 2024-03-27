'use client'

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import React from 'react'

import { signOutAction } from '@/app/(auth)/actions/sign-out-action'

export function SignOutForm() {
  return (
    <form className="flex flex-col gap-2" action={signOutAction}>
      <Button
        size="lg"
        radius="none"
        className="w-full"
        startContent={<ArrowRightStartOnRectangleIcon width={24} height={24} />}
        type="submit"
      >
        <span className="font-bold">Pulsa para salir</span>
      </Button>
    </form>
  )
}
