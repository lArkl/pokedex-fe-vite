import { FC, ReactNode, useEffect } from 'react'
import useUserQuery, { getUserQueryKey } from '../../hooks/useUserQuery'
import { setUserToken } from '../../utils/auth'
import { useQueryClient } from '@tanstack/react-query'
import Loader from '../../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ERROR_MESSAGE } from '../../utils/error'
import Typography from '../../components/Typography'
import { AppRoutes } from '../../routes/appRoutes'
import Button from '../../components/Button'
import styles from './AuthGuard.module.scss'

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, isSuccess } = useUserQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (error?.message && ERROR_MESSAGE.INVALID_TOKEN === error.message) {
      toast('Invalid user, Sign in as Guest', { type: 'error' })
      setUserToken('')
      queryClient.removeQueries({ queryKey: getUserQueryKey() })
    }
  }, [error, isFetching, navigate, queryClient])

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.bar}>
            <Typography>
              Logged in as <strong>{data?.firstname ?? 'Guest'}</strong>
            </Typography>
            {isSuccess ? (
              <Button
                size="small"
                variant="secondary"
                className={styles.button}
                onClick={() => {
                  queryClient.removeQueries({ queryKey: getUserQueryKey() })
                  toast('Logged out', { type: 'success' })
                  setUserToken('')
                  navigate(AppRoutes.Login)
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to={AppRoutes.Login}>
                <Button size="small" variant="secondary" className={styles.button} type="button">
                  Login
                </Button>
              </Link>
            )}
          </div>
          {children}
        </div>
      )}
    </>
  )
}
export default AuthGuard
