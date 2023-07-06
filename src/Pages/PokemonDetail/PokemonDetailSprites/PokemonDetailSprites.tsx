import { FC } from 'react'
import styles from './PokemonDetailSprites.module.scss'
import { Pokemon } from '../../../requests/getPokemons'
import Typography from '../../../components/Typography/Typography'

interface PokemonDetailSpritesProps {
  pokemonInfo: Pokemon
  className?: string
}

const PokemonDetailSprites: FC<PokemonDetailSpritesProps> = ({ pokemonInfo, className }) => {
  return (
    <div aria-label="sprites" className={className}>
      <Typography variant="lg" className={styles.header}>
        Sprites
      </Typography>
      <div className={styles.list}>
        <div aria-label="default" className={styles.row}>
          <Typography variant="md">Default</Typography>
          <div className={styles.sprites}>
            <img src={pokemonInfo.sprites.default.frontUrl} alt={`${pokemonInfo.name} default sprite front`} />
            <img src={pokemonInfo.sprites.default.backUrl} alt={`${pokemonInfo.name} default sprite back`} />
          </div>
        </div>
        <div aria-label="shiny" className={styles.row}>
          <Typography variant="md">Shiny</Typography>
          <div className={styles.sprites}>
            <img src={pokemonInfo.sprites.shiny.frontUrl} alt={`${pokemonInfo.name} shiny sprite front`} />
            <img src={pokemonInfo.sprites.shiny.backUrl} alt={`${pokemonInfo.name} shiny sprite back`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailSprites
