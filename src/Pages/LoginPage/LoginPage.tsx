import { FC } from 'react'
import styles from './LoginPage.module.scss'
import LoginHeader from './LoginHeader/LoginHeader'
import LoginForn from './LoginForm/LoginForn'

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <LoginHeader />
      <LoginForn />
    </div>
  )
}

export default Login
