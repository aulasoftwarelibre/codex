'use client'

import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
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
      <form className="flex flex-col gap-2" action={action}>
        <InputForm
          label="Email"
          autoFocus
          endContent={
            <EnvelopeIcon
              height={24}
              width={24}
              className="pointer-events-none flex-shrink-0 text-2xl text-default-400"
            />
          }
          name="email"
          type="email"
          placeholder="Introduce tu email"
          variant="bordered"
          state={state}
          defaultValue={state.data.email}
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
