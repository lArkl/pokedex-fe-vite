import { isAxiosError } from 'axios'

export const getRequestError = (error: unknown) => {
  if (isAxiosError(error) && error.response?.data) {
    const err = error.response?.data.error as { message: string; name: string }
    const e = Error(err.message)
    e.name = err.name
    return e
  }
  return Error('Something went wrong!')
}

export enum ErrorType {
  AuthTokenError = 'AuthTokenError',
  AuthUserError = 'AuthUserError',
}
