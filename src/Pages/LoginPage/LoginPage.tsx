import { FC } from 'react'
import Typography from '../../components/Typography/Typography'
import viteIcon from '/vite.svg'
import reactIcon from '/react.svg'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import styles from './LoginPage.module.scss'
import Button from '../../components/Button'
import Loader from '../../components/Loader'

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Welcome to the Pokedex
      </Typography>
      <Loader />
      <div className={styles.powered}>
        <Typography variant="md">Powered by</Typography>
        <div className={styles.icons} aria-label="icons">
          <img src={viteIcon} alt="vite icon" width={50} />
          <img src={reactIcon} alt="react icon" width={50} className={styles.reactIcon} />
        </div>
      </div>
      <Link to={AppRoutes.PokemonList}>
        <Button variant="secondary" className={styles.search}>
          Search Pokemons
        </Button>
      </Link>
    </div>
  )
}

export default Login
