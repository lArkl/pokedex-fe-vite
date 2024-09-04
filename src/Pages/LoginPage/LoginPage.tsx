import { FC } from 'react'
import styles from './LoginPage.module.scss'
import LoginHeader from './LoginHeader/LoginHeader'
import LoginForm from './LoginForm/LoginForm'

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <LoginHeader />
      <LoginForm />
    </div>
  )
}

export default Login
