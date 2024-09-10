import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserInfoRequest, logoutSessionRequest } from '../requests/user.requests'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { getRequestError } from '../utils/error'

export const getUserQueryKey = () => ['user']

const useUserQuery = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logoutUser = useCallback(
    async (redirectPath?: string) => {
      queryClient.removeQueries({ queryKey: getUserQueryKey() })
      await logoutSessionRequest()
      toast('Logged out', { type: 'success' })
      if (redirectPath) {
        navigate(redirectPath)
      }
    },
    [navigate, queryClient],
  )

  const userQuery = useQuery({
    queryKey: getUserQueryKey(),
    queryFn: async ({ signal }) => {
      try {
        const response = await getUserInfoRequest(signal)
        return response.data.data
      } catch (err) {
        throw getRequestError(err)
      }
    },
    retry: false,
    staleTime: Infinity,
  })

  return { ...userQuery, logoutUser }
}

export default useUserQuery
