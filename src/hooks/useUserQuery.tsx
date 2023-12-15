import { useQuery } from '@tanstack/react-query'
import { validateUserRequest } from '../requests/user.requests'
import { getUserToken } from '../utils/auth'
import { AxiosError } from 'axios'
import { ERROR_MESSAGE } from '../utils/error'

export const getUserQueryKey = () => ['user']

const useUserQuery = () => {
  return useQuery({
    queryKey: getUserQueryKey(),
    queryFn: async ({ signal }) => {
      const token = getUserToken()
      if (!token) throw Error(ERROR_MESSAGE.MISSING_TOKEN)
      try {
        const response = await validateUserRequest(token ?? '', signal)
        return response.data.data
      } catch (err) {
        if (err instanceof AxiosError && err.response?.data.error) {
          throw Error(err.response.data.error.message)
        }
        throw err
      }
    },
    retry: false,
    staleTime: Infinity,
  })
}

export default useUserQuery
