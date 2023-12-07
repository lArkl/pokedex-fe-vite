import { FC } from 'react'
import Typography from '../../components/Typography'
import viteIcon from '/vite.svg'
import reactIcon from '/react.svg'
import styles from './LoginPage.module.scss'
import Loader from '../../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import SignInForm from '../../components/SignInForm/SignInForm'
import Button from '../../components/Button'
import { AppRoutes } from '../../routes/appRoutes'

const Login: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Welcome to the Pokedex
      </Typography>
      <Loader className={styles.loader} />
      <SignInForm
        onSuccess={() => {
          navigate(`/pokemons`)
        }}
        extraButtons={
          <Link to={AppRoutes.PokemonList}>
            <Button variant="secondary" className={styles.search} type="button">
              Continue as Guest
            </Button>
          </Link>
        }
      />
      <div className={styles.powered}>
        <Typography variant="md">Powered by</Typography>
        <div className={styles.icons} aria-label="icons">
          <img src={viteIcon} alt="vite icon" width={50} />
          <img src={reactIcon} alt="react icon" width={50} className={styles.reactIcon} />
        </div>
      </div>
    </div>
  )
}

export default Login
