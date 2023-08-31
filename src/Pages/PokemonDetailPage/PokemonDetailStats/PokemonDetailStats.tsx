import { FC } from 'react'
import Typography from '../../../components/Typography'
import { PokemonDto } from '../../../requests/dto'
import styles from './PokemonDetailStats.module.scss'
import classNames from 'classnames'
import StatsList, { StatsListProps } from '../../../components/StatsList/StatsList'

interface PokemonDetailStatsProps {
  pokemonInfo: PokemonDto
  className?: string
}

const PokemonDetailStats: FC<PokemonDetailStatsProps> = ({ pokemonInfo, className }) => {
  const { stats } = pokemonInfo
  const statsList: StatsListProps['list'] = [
    { name: 'HP', value: stats.hp, max: 255 },
    { name: 'Attack', value: stats.attack, max: 255 },
    { name: 'Special Attack', value: stats.specialAttack, max: 255 },
    { name: 'Special Defense', value: stats.specialDefense, max: 255 },
    { name: 'Speed', value: stats.speed, max: 255 },
  ]
  return (
    <div aria-label="stats" className={classNames(className, styles.container)}>
      <Typography variant="lg">Stats</Typography>
      <StatsList list={statsList} />
    </div>
  )
}

export default PokemonDetailStats
