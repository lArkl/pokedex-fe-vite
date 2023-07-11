import { FC } from 'react'
import Typography from '../../../components/Typography/Typography'
import { PokemonDto } from '../../../requests/dto'
import ProgressBar from '../../../components/ProgressBar'
import styles from './PokemonDetailStats.module.scss'
import classNames from 'classnames'

interface PokemonDetailStatsProps {
  pokemonInfo: PokemonDto
  className?: string
}

const PokemonDetailStats: FC<PokemonDetailStatsProps> = ({ pokemonInfo, className }) => {
  const { stats } = pokemonInfo
  const statsList = [
    { name: 'HP', value: stats.hp },
    { name: 'Attack', value: stats.attack },
    { name: 'Special Attack', value: stats.specialAttack },
    { name: 'Special Defense', value: stats.specialDefense },
    { name: 'Speed', value: stats.speed },
  ]
  return (
    <div aria-label="stats" className={classNames(className, styles.container)}>
      <Typography variant="lg">Stats</Typography>
      <ul>
        {statsList.map((stat) => (
          <li key={stat.name} className={styles.item} aria-label={stat.name}>
            <Typography variant="sm">{stat.name}</Typography>
            <ProgressBar value={stat.value} max={255} />
          </li>
        ))}
        {/* <li>
          <Typography variant="sm">{stats.attack}</Typography>
        </li>
        <li>
          <Typography variant="sm">{stats.defense}</Typography>
        </li>
        <li>
          <Typography variant="sm">{stats.specialAttack}</Typography>
        </li>
        <li>
          <Typography variant="sm">{stats.specialDefense}</Typography>
        </li>
        <li>
          <Typography variant="sm">{stats.speed}</Typography>
        </li> */}
      </ul>
    </div>
  )
}

export default PokemonDetailStats
