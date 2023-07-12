import { FC } from 'react'
import { PokemonItemDto } from '../../../requests/dto'
import Typography from '../../../components/Typography/Typography'
import { capitalize } from '../../../utils/strings'
import PokemonTypeBadge from '../../../components/PokemonTypeBadge'
import { Link } from 'react-router-dom'
import styles from './PokemonListItem.module.scss'
import { AppRoutes } from '../../../routes/appRoutes'

interface PokemonListItemProps {
  pokemonInfo: PokemonItemDto
}

const PokemonListItem: FC<PokemonListItemProps> = ({ pokemonInfo }) => {
  return (
    <article className={styles.container}>
      <Link to={AppRoutes.PokemonDetail.replace(':id', pokemonInfo.id.toString())} className={styles.link}>
        <Typography variant="lg">{capitalize(pokemonInfo.name)}</Typography>
        <Typography variant="md" className={styles.id}>
          {pokemonInfo.id}
        </Typography>
      </Link>
      <div className={styles.image}>
        <img src={pokemonInfo.spriteUrl} alt={pokemonInfo.name} width={180} height={180} />
      </div>
      <div className={styles.types}>
        {pokemonInfo.types.map((pokemonType) => (
          <PokemonTypeBadge typeName={pokemonType.name} key={pokemonType.id} />
        ))}
      </div>
    </article>
  )
}

export default PokemonListItem
