import { FC } from 'react'
import { PokemonItemDto } from '../../../requests/dto'
import PokemonTypeBadge from '../../../components/PokemonTypeBadge'
import { DEFAULT_SPRITE } from '../../../config/main'
import ItemCard from '../../../components/PokemonCard/ItemCard'
import { Link } from 'react-router-dom'
import styles from './PokemonListItem.module.scss'
import { AppRoutes } from '../../../routes/appRoutes'

interface PokemonListItemProps {
  pokemonInfo: PokemonItemDto
}

const PokemonListItem: FC<PokemonListItemProps> = ({ pokemonInfo }) => {
  return (
    <Link to={AppRoutes.PokemonDetail.replace(':id', pokemonInfo.id.toString())} className={styles.link}>
      <ItemCard title={pokemonInfo.name} id={pokemonInfo.id} imgUrl={pokemonInfo.spriteUrl ?? DEFAULT_SPRITE}>
        {pokemonInfo.types.map((pokemonType) => (
          <PokemonTypeBadge typeName={pokemonType.name} key={pokemonType.id} />
        ))}
      </ItemCard>
    </Link>
  )
}

export default PokemonListItem
