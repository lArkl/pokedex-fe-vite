import { FC } from 'react'
import { Link } from 'react-router-dom'
import Typography from '../../components/Typography'
import { AppRoutes } from '../../routes/appRoutes'
import Button from '../../components/Button'
import styles from './AuthGuard.module.scss'

const GuestBar: FC = () => {
  return (
    <div className={styles.bar}>
      <Typography className={styles.loggedIn}>
        Logged in as <strong>Guest</strong>
      </Typography>
      <Link to={AppRoutes.Login}>
        <Button size="small" variant="secondary" className={styles.button} type="button">
          Login
        </Button>
      </Link>
    </div>
  )
}

export default GuestBar
