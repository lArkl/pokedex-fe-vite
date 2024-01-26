import { FC, ReactNode, useEffect } from 'react'
import useUserQuery from '../../hooks/useUserQuery'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { ERROR_MESSAGE } from '../../utils/error'
import Typography from '../../components/Typography'
import { AppRoutes } from '../../routes/appRoutes'
import Button from '../../components/Button'
import styles from './AuthGuard.module.scss'

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { isFetching, error, data, isSuccess, clearUser, logoutUser } = useUserQuery()

  useEffect(() => {
    if (error?.message && ERROR_MESSAGE.INVALID_TOKEN === error.message) {
      clearUser()
    }
  }, [clearUser, error?.message])

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
                  logoutUser(AppRoutes.Login)
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
