'use server'

import { z } from 'zod'

import { signIn } from '@/lib/auth/auth'
import FormResponse from '@/lib/zod/form-response'

export interface SignInForm {
  email?: string
}

const FormSchema = z.object({
  email: z
    .string()
    .email('Introduce un correo válido.')
    .regex(/@uco.es$/, 'Introduce un correo válido de la UCO'),
})

export async function signInAction(
  previousState: FormResponse<SignInForm>,
  formData: FormData,
): Promise<FormResponse<SignInForm>> {
  const result = FormSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return FormResponse.withError(result.error, previousState.data)
  }

  await signIn('email', result.data)

  return FormResponse.success(result.data)
}
