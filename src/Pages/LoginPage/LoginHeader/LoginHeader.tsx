import { FC } from 'react'
import Typography from '../../../components/Typography'
import Loader from '../../../components/Loader'
import styles from './LoginHeader.module.scss'

const LoginHeader: FC = () => {
  return (
    <>
      <Typography variant="xl" className={styles.header}>
        Welcome to the Pokedex
      </Typography>
      <Loader className={styles.loader} />
    </>
  )
}

export default LoginHeader
