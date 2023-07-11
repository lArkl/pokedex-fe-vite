import { FC, useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { getPokemonFromIdRequest } from '../../requests/getPokemons'
import { useParams } from 'react-router-dom'
import PokemonDetailMain from './PokemonDetailMain'
import PokemonDetailAbout from './PokemonDetailAbout'
import PokemonDetailSprites from './PokemonDetailSprites'
import PokemonDetailStats from './PokemonDetailStats'
import PokemonDetailMoves from './PokemonDetailMoves'
import { PokemonDto } from '../../requests/dto'
import { useRequestState } from '../../hooks/useRequestState'
import ErrorPage from '../ErrorPage'
import styles from './PokemonDetailPage.module.scss'

const PokemonDetail: FC = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonDto>()
  const { requestState, setRequestState } = useRequestState()
  const { id } = useParams()

  useEffect(() => {
    setRequestState('loading')
    getPokemonFromIdRequest(Number(id))
      .then((data) => {
        setPokemonInfo(data)
        setRequestState('success')
      })
      .catch(() => setRequestState('error'))
  }, [id, setRequestState])

  return (
    <>
      {requestState === 'success' && pokemonInfo ? (
        <div className={styles.details}>
          <PokemonDetailMain pokemonInfo={pokemonInfo} />
          <PokemonDetailAbout pokemonInfo={pokemonInfo} />
          <PokemonDetailStats pokemonInfo={pokemonInfo} />
          <PokemonDetailMoves pokemonInfo={pokemonInfo} />
          <PokemonDetailSprites pokemonInfo={pokemonInfo} />
        </div>
      ) : null}
      {requestState === 'loading' ? <Loader /> : null}
      {requestState === 'error' ? <ErrorPage /> : null}
    </>
  )
}

export default PokemonDetail
