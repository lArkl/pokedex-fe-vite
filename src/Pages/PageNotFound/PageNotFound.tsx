import { FC } from 'react'
import Typography from '../../components/Typography'
import styles from './PageNotFound.module.scss'

const PageNotFound: FC = () => {
  return (
    <div className={styles.container}>
      <Typography variant="xl">404</Typography>
      <Typography variant="md">Page not found</Typography>
    </div>
  )
}

export default PageNotFound
