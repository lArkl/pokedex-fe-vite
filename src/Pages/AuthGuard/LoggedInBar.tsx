import { formatDistance } from 'date-fns'
import { FC, useEffect, useState } from 'react'
import styles from './AuthGuard.module.scss'
import Button from '../../components/Button'
import Typography from '../../components/Typography'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'

const getDifferenceInTime = (expirationText: string): string => {
  const expiration = new Date(expirationText)
  const now = new Date()
  let diff = expiration.getTime() - now.getTime()

  if (diff <= 0) {
    return ''
  }

  return formatDistance(now, expiration, { includeSeconds: true })
}

const LoggedInBar: FC<{ firstname: string; expiration: string; onLogout: () => void }> = ({
  firstname,
  expiration,
  onLogout,
}) => {
  const navigate = useNavigate()
  const [expires, setExpires] = useState('')
  useEffect(() => {
    const updateExpiration = () => {
      const expiresIn = getDifferenceInTime(expiration)
      setExpires(expiresIn)
    }
    const intervalId = setInterval(updateExpiration, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [expiration])
  return (
    <div className={styles.bar}>
      <div className={styles.barSection}>
        <Typography className={styles.loggedIn}>
          Logged in as <strong>{firstname}</strong>
        </Typography>
        <Button
          size="small"
          className={styles.update}
          disabled={!expires}
          onClick={() => {
            navigate(AppRoutes.UpdateProfile)
          }}
        >
          Update profile
        </Button>
      </div>
      <div className={styles.barSection}>
        <div>{expires ? `session ends in ${expires}` : '-'}</div>
        <Button size="small" variant="secondary" className={styles.logout} onClick={onLogout} disabled={!expires}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default LoggedInBar
