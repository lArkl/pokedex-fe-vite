import { useQuery, useQueryClient } from '@tanstack/react-query'
import { validateUserRequest } from '../requests/user.requests'
import { getUserToken, setUserToken } from '../utils/auth'
import { AxiosError } from 'axios'
import { ERROR_MESSAGE } from '../utils/error'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCallback } from 'react'

export const getUserQueryKey = () => ['user']

const useUserQuery = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logoutUser = useCallback(
    async (redirectPath?: string) => {
      setUserToken('')
      queryClient.removeQueries({ queryKey: getUserQueryKey() })
      toast('Logged out', { type: 'success' })
      if (redirectPath) {
        navigate(redirectPath)
      }
    },
    [navigate, queryClient],
  )

  const clearUser = useCallback(
    (showToast = true) => {
      if (showToast) {
        toast('Invalid user, Signed in as Guest', { type: 'error' })
      }
      setUserToken('')
      queryClient.removeQueries({ queryKey: getUserQueryKey() })
    },
    [queryClient],
  )

  const userQuery = useQuery({
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

  return { ...userQuery, clearUser, logoutUser }
}

export default useUserQuery
