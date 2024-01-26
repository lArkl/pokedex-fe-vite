import { isAxiosError } from 'axios'

export const getRequestError = (error: Error) => {
  if (isAxiosError(error) && error.response?.data) {
    const err = error.response?.data.error as { message: string }
    return Error(err.message)
  }
  return Error('Something went wrong!')
}

export const ERROR_MESSAGE = {
  MISSING_TOKEN: 'No User token',
  INVALID_TOKEN: 'Invalid token',
}
