import { FC } from 'react'
import styles from './PokemonDetailAbout.module.scss'
import { Pokemon } from '../../../requests/getPokemons'
import Typography from '../../../components/Typography/Typography'
import classNames from 'classnames'

interface PokemonDetailAboutProps {
  pokemonInfo: Pokemon
  className?: string
}

const PokemonDetailAbout: FC<PokemonDetailAboutProps> = ({ pokemonInfo, className }) => {
  return (
    <div className={classNames(styles.container, className)} aria-label="about">
      <Typography variant="lg" className={styles.title}>
        About
      </Typography>
      <div className={styles.main}>
        <div className={styles.info} aria-label="weight">
          <Typography variant="md">Weight</Typography>
          <Typography variant="sm">{pokemonInfo.weight} kg</Typography>
        </div>
        <div className={styles.info} aria-label="height">
          <Typography variant="md">Height</Typography>
          <Typography variant="sm">{pokemonInfo.height} m</Typography>
        </div>
        <div className={styles.info} aria-label="abilities">
          <Typography variant="md">Abilities</Typography>
          <ul className={styles.abilities}>
            {pokemonInfo.abilites.map((abilityName, index) => (
              <li key={`ability-${index}`}>
                <Typography variant="sm">{abilityName}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailAbout
