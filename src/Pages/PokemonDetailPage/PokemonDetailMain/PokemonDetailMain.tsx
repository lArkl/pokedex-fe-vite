import { FC } from 'react'
import styles from './PokemonDetailMain.module.scss'
import Typography from '../../../components/Typography'
import PokemonTypeBadge from '../../../components/PokemonTypeBadge'
import classNames from 'classnames'
import { capitalize } from '../../../utils/strings'
import { PokemonDto } from '../../../requests/dto'
import { DEFAULT_SPRITE } from '../../../config/main'

interface PokemonDetailMainProps {
  pokemonInfo: PokemonDto
  className?: string
}

const PokemonDetailMain: FC<PokemonDetailMainProps> = ({ pokemonInfo, className }) => {
  return (
    <div className={classNames(styles.container, className)} data-testid="PokemonDetailMain">
      <Typography variant="xl" className={styles.title}>
        {capitalize(pokemonInfo.name)}
      </Typography>
      <div className={styles.sprite} style={{ backgroundColor: `var(--color-${pokemonInfo.types[0].name})` }}>
        <img src={pokemonInfo.spriteUrl ?? DEFAULT_SPRITE} alt={pokemonInfo.name} width={200} height={200} />
      </div>
      <div className={styles.types} aria-label="types">
        {pokemonInfo.types.map((pokeType) => (
          <PokemonTypeBadge key={`type-${pokeType.id}`} typeName={pokeType.name} />
        ))}
      </div>
    </div>
  )
}

export default PokemonDetailMain
