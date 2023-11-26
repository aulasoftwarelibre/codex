'use client'

import { Input, InputProps } from '@nextui-org/react'
import { ZodIssue } from 'zod'

type FormInputProperties = InputProps & {
  errors?: ZodIssue[]
  label: string
}

export default function InputForm(properties: FormInputProperties) {
  const { errors = [], label, name, ...rest } = properties

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
