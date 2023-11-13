import { FC } from 'react'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'
import PokemonDetailMain from './PokemonDetailMain'
import PokemonDetailAbout from './PokemonDetailAbout'
import PokemonDetailSprites from './PokemonDetailSprites'
import PokemonDetailStats from './PokemonDetailStats'
import PokemonDetailMoves from './PokemonDetailMoves'
import ErrorPage from '../ErrorPage'
import styles from './PokemonDetailPage.module.scss'
import usePokemonDetailQuery from '../../hooks/usePokemonDetailQuery'

const PokemonDetail: FC = () => {
  const { id } = useParams()

  const { isLoading, isError, data: pokemonInfo } = usePokemonDetailQuery(Number(id))
  return (
    <>
      {pokemonInfo ? (
        <div className={styles.details}>
          <PokemonDetailMain pokemonInfo={pokemonInfo} />
          <PokemonDetailAbout pokemonInfo={pokemonInfo} />
          <PokemonDetailStats pokemonInfo={pokemonInfo} />
          <PokemonDetailMoves pokemonInfo={pokemonInfo} />
          <PokemonDetailSprites pokemonInfo={pokemonInfo} />
        </div>
      ) : null}
      {isLoading ? <Loader /> : null}
      {isError ? <ErrorPage /> : null}
    </>
  )
}

export default PokemonDetail
