import { ZodError, ZodIssue } from 'zod'

type FormResponse<T> = ErrorFormResponse<T> | SuccessFormResponse<T>

interface ErrorFormResponse<T = undefined> {
  data: T
  errors: ZodIssue[]
  success: false
}

interface SuccessFormResponse<T = undefined> {
  data: T
  message: string
  success: true
}

const FormResponse = {
  custom: <T = undefined>(
    path: string[],
    message: string,
    data: T,
  ): FormResponse<T> => ({
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
  success: <T = undefined>(data: T, message: string = ''): FormResponse<T> => ({
    data,
    message,
    success: true,
  }),
  withError: <T = undefined>(error: ZodError<T>, data: T): FormResponse<T> => ({
    data,
    errors: error.issues,
    success: false,
  }),
}

export { FormResponse }
