'use server'

import { z, ZodError, ZodIssue } from 'zod'

import { signIn } from '@/lib/auth/auth'

const FormSchema = z.object({
  email: z
    .string()
    .email('Introduce un correo válido.')
    .regex(/@uco.es$/, 'Introduce un correo válido de la UCO'),
})

export async function form(
  prevState: ZodIssue[] | undefined,
  formData: FormData,
) {
  try {
    const { email } = FormSchema.parse(Object.fromEntries(formData))

    return signIn('email', {
      email,
    })
  } catch (error) {
    console.error(`ERROR IN SIGN IN: ${(error as Error).toString()}`)

    if ((error as ZodError).issues) {
      return (error as ZodError).issues
    }

    throw error
  }
}
