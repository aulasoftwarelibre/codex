'use client'

import { Textarea, TextAreaProps } from '@nextui-org/input'

import { FormResponse } from '@/lib/zod/form-response'

export type TextareaFormProperties = TextAreaProps & {
  label?: string
  state: FormResponse<unknown>
}

export function TextareaForm(properties: TextareaFormProperties) {
  const { label, name, state, ...rest } = properties

  const errors = state.success ? [] : state.errors

  const errorMessage = errors
    .filter((error) => error.path[0] === name)
    .map((error) => error.message)
    .join(', ')

  return (
    <>
      <Textarea
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
        label={label}
        labelPlacement="outside"
        name={name}
        placeholder={label}
        radius="none"
        size="lg"
        {...rest}
      />
    </>
  )
}
