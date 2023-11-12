'use client'

import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useFormState } from 'react-dom'
import { ZodIssue } from 'zod'

import { form } from '@/components/SignInEmailForm/actions'

export default function SignInEmailForm() {
  const [code, action] = useFormState(form, [])

  const errors = code.reduce(
    (map, error) => {
      map[error.path.toString()] = error
      return map
    },
    {} as Record<string, ZodIssue>,
  )

  return (
    <>
      <form className="flex flex-col gap-2" action={action}>
        <Input
          name="email"
          type="email"
          autoFocus
          endContent={
            <EnvelopeIcon
              height={24}
              width={24}
              className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
            />
          }
          label="Email"
          placeholder="Introduce tu email"
          variant="bordered"
          errorMessage={errors?.email?.message}
          color={errors?.email ? 'danger' : 'default'}
        />
        <Button
          size="lg"
          radius="none"
          className={` w-full`}
          startContent={<EnvelopeIcon height={24} width={24} />}
          type="submit"
        >
          <span className="font-bold">Continuar con el email</span>
        </Button>
      </form>
    </>
  )
}
