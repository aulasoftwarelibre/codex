import { ZodError, ZodIssue } from 'zod'

interface FormResponse<T = undefined> {
  data: T
  errors: ZodIssue[]
  success: boolean
}

const FormResponse = {
  custom: <T>(path: string[], message: string, data: T): FormResponse<T> => ({
    data,
    errors: [
      {
        code: 'custom',
        message,
        path,
      },
    ],
    success: false,
  }),
  initialState: <T = undefined>(data: T): FormResponse<T> => ({
    data,
    errors: [],
    success: false,
  }),
  success: <T = undefined>(data: T): FormResponse<T> => ({
    data,
    errors: [],
    success: true,
  }),
  withError: <T = undefined>(error: ZodError<T>, data: T): FormResponse<T> => ({
    data,
    errors: error.issues,
    success: false,
  }),
}

export default FormResponse
