import { FC } from 'react'
import styles from './PokemonDetailMoves.module.scss'
import { Pokemon } from '../../../requests/getPokemons'
import Typography from '../../../components/Typography/Typography'

interface PokemonDetailMovesProps {
  pokemonInfo: Pokemon
  className?: string
}

const PokemonDetailMoves: FC<PokemonDetailMovesProps> = ({ pokemonInfo, className }) => {
  return (
    <div aria-label="moves" className={className}>
      <Typography variant="lg">Moves</Typography>
      <ul className={styles.moves}>
        {pokemonInfo.moves.map((moveName, index) => (
          <li key={`moves-${index}`} className={styles.move}>
            <Typography variant="sm">{moveName}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonDetailMoves
