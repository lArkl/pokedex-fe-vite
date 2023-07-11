import { FC } from 'react'
import Typography from '../../components/Typography/Typography'
import styles from './ErrorPage.module.scss'

const ErrorPage: FC = () => {
  return (
    <div className={styles.container} aria-label="error">
      <Typography variant="xl">Something went wrong...</Typography>
      <Typography variant="lg">Try reloading the page in some seconds</Typography>
      <Typography variant="md">If this persists, contact to IT</Typography>
    </div>
  )
}

export default ErrorPage
