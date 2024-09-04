import { FC, ReactNode, useEffect, useState } from 'react'
import useUserQuery from '../../hooks/useUserQuery'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { ErrorType } from '../../utils/error'
import Typography from '../../components/Typography'
import { AppRoutes } from '../../routes/appRoutes'
import Button from '../../components/Button'
import styles from './AuthGuard.module.scss'

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { isFetching, error, data, isSuccess, clearUser, logoutUser } = useUserQuery()

  const [expires, setExpires] = useState('')
  useEffect(() => {
    const updateExpiration = () => {
      const expiration = new Date(data?.expiration ?? '')
      const now = new Date()
      const diff = expiration.getTime() - now.getTime()
      const diffDate = new Date(diff)
      const mm = diffDate.getMinutes() // minutes
      const ss = diffDate.getSeconds() // seconds
      setExpires(`${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`)
    }
    const intervalId = setInterval(updateExpiration, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [data?.expiration])

  useEffect(() => {
    if (error && error.name === ErrorType.AuthTokenError) {
      clearUser()
    }
  }, [clearUser, error, error?.name])

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
              <>
                <Button
                  size="small"
                  variant="secondary"
                  className={styles.button}
                  onClick={() => {
                    logoutUser(AppRoutes.Login)
                  }}
                >
                  Logout
                </Button>
                <div>Session ends in {expires}</div>
              </>
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
