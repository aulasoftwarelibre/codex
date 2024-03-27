'use client'

import { Input, InputProps } from '@nextui-org/react'

import { FormResponse } from '@/lib/zod/form-response'

export type FormInputProperties = InputProps & {
  label?: string
  state: FormResponse<unknown>
}

export function InputForm(properties: FormInputProperties) {
  const { label, name, state, ...rest } = properties

  const errors = state.success ? [] : state.errors

  const errorMessage = errors
    .filter((error) => error.path[0] === name)
    .map((error) => error.message)
    .join(', ')

  return (
    <>
      <Input
        label={label}
        placeholder={label}
        labelPlacement="outside"
        name={name}
        radius="none"
        size="lg"
        errorMessage={errorMessage}
        {...rest}
      />
    </>
  )
}
