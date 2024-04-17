'use client'

import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/button'
import React from 'react'
import { useFormState } from 'react-dom'

import { signInAction } from '@/app/(auth)/actions/sign-in-action'
import { InputForm } from '@/components/form/input-form'
import { FormResponse } from '@/lib/zod/form-response'

export function SignInEmailForm() {
  const [state, action] = useFormState(
    signInAction,
    FormResponse.initialState({
      email: '',
    }),
  )

  return (
    <>
      <form action={action} className="flex flex-col gap-2">
        <InputForm
          autoFocus
          defaultValue={state.data.email}
          endContent={
            <EnvelopeIcon
              className="pointer-events-none flex-shrink-0 text-2xl text-default-400"
              height={24}
              width={24}
            />
          }
          label="Email"
          name="email"
          placeholder="Introduce tu email"
          state={state}
          type="email"
          variant="bordered"
        />
        <Button
          className={` w-full`}
          radius="none"
          size="lg"
          startContent={<EnvelopeIcon height={24} width={24} />}
          type="submit"
        >
          <span className="font-bold">Continuar con el email</span>
        </Button>
      </form>
    </>
  )
}
