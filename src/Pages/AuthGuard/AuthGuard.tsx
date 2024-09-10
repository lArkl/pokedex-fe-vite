import { FC, ReactNode } from 'react'
import useUserQuery from '../../hooks/useUserQuery'
import Loader from '../../components/Loader'
import { AppRoutes } from '../../routes/appRoutes'
import styles from './AuthGuard.module.scss'
import LoggedInBar from './LoggedInBar'
import GuestBar from './GuestBar'

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { isFetching, data, isSuccess, logoutUser } = useUserQuery()

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {isSuccess || data ? (
            <LoggedInBar
              expiration={data.expiration}
              firstname={data.firstname ?? ''}
              onLogout={() => logoutUser(AppRoutes.Login)}
            />
          ) : (
            <GuestBar />
          )}
          {children}
        </div>
      )}
    </>
  )
}
export default AuthGuard
