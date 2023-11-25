import { ZodIssue } from 'zod'

interface FormResponse {
  errors?: ZodIssue[]
  success: boolean
}

const FormResponse = {
  custom: (path: string[], message: string): FormResponse => ({
    errors: [
      {
        code: 'custom',
        message,
        path,
      },
    ],
    success: false,
  }),
  initialState: (): FormResponse => ({
    errors: [],
    success: false,
  }),
  success: (): FormResponse => ({
    success: true,
  }),
}

export default FormResponse
