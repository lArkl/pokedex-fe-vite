import { FC } from 'react'
import styles from './PokemonDetailMain.module.scss'
import { Pokemon } from '../../../requests/getPokemons'
import Typography from '../../../components/Typography/Typography'
import PokemonTypeBadge from '../../../components/PokemonTypeBadge'
import classNames from 'classnames'
import { capitalize } from '../../../utils/strings'

interface PokemonDetailMainProps {
  pokemonInfo: Pokemon
  className?: string
}

const PokemonDetailMain: FC<PokemonDetailMainProps> = ({ pokemonInfo, className }) => {
  return (
    <div className={classNames(styles.container, className)} data-testid="PokemonDetailMain">
      <div className={styles.title}>
        <Typography variant="xl">{capitalize(pokemonInfo.name)}</Typography>
        <Typography variant="md">{pokemonInfo.id}</Typography>
      </div>
      <div className={styles.sprite} style={{ backgroundColor: `var(--color-${pokemonInfo.types[0].type.name})` }}>
        <img src={pokemonInfo.spriteUrl} alt={pokemonInfo.name} width={200} height={200} />
      </div>
      <div className={styles.types} aria-label="types">
        {pokemonInfo.types.map((pokeType, index) => (
          <PokemonTypeBadge key={`type-${index}`} typeName={pokeType.type.name} />
        ))}
      </div>
    </div>
  )
}

export default PokemonDetailMain
