import { Link, useNavigate } from 'react-router-dom'
import useUserQuery from '../../../hooks/useUserQuery'
import Typography from '../../../components/Typography'
import Button from '../../../components/Button'
import { AppRoutes } from '../../../routes/appRoutes'
import viteIcon from '/vite.svg'
import reactIcon from '/react.svg'
import { FC } from 'react'
import styles from './LoginForm.module.scss'
import SignInForm from '../../../components/SignInForm/SignInForm'

const LoginForn: FC = () => {
  const navigate = useNavigate()
  const { isFetching, data: userData, logoutUser } = useUserQuery()
  return (
    <>
      {!isFetching ? (
        userData ? (
          <div className={styles.welcome}>
            <Typography variant="md">Good to see you again {userData.firstname}!</Typography>
            <Link to={AppRoutes.PokemonList}>
              <Button variant="secondary" type="button">
                Search Pokemons
              </Button>
            </Link>
            <Button
              variant="secondary"
              type="button"
              className={styles.search}
              onClick={() => {
                logoutUser()
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <SignInForm
            onSuccess={() => {
              navigate(AppRoutes.PokemonList)
            }}
          />
        )
      ) : null}
      <div className={styles.powered}>
        <Typography variant="md">Powered by</Typography>
        <div className={styles.icons} aria-label="icons">
          <img src={viteIcon} alt="vite icon" width={50} />
          <img src={reactIcon} alt="react icon" width={50} className={styles.reactIcon} />
        </div>
      </div>
    </>
  )
}

export default LoginForn
