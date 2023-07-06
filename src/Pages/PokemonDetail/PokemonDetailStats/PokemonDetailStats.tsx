import { FC } from 'react'
import { Pokemon } from '../../../requests/getPokemons'
import Typography from '../../../components/Typography/Typography'

interface PokemonDetailStatsProps {
  pokemonInfo: Pokemon
  className?: string
}

const PokemonDetailStats: FC<PokemonDetailStatsProps> = ({ pokemonInfo, className }) => {
  return (
    <div aria-label="stats" className={className}>
      <Typography variant="lg">Stats</Typography>
      <ul className="">
        {pokemonInfo.stats.map((stat, index) => (
          <li key={`stat-${index}`}>
            <Typography variant="sm">{stat.name}</Typography>
            <Typography variant="sm">{stat.value}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonDetailStats
