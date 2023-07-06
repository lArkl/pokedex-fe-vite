import { FC, useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { Pokemon, getPokemonFromId } from '../../requests/getPokemons'
import { useParams } from 'react-router-dom'
import styles from './PokemonDetail.module.scss'
import PokemonDetailMain from './PokemonDetailMain'
import PokemonDetailAbout from './PokemonDetailAbout'
import PokemonDetailSprites from './PokemonDetailSprites'
import PokemonDetailStats from './PokemonDetailStats'
import PokemonDetailMoves from './PokemonDetailMoves'

const PokemonDetail: FC = () => {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>()

  const { id } = useParams()

  useEffect(() => {
    getPokemonFromId(Number(id)).then((data) => {
      setPokemonInfo(data)
    })
  }, [id])

  return pokemonInfo ? (
    <div className={styles.details}>
      <PokemonDetailMain pokemonInfo={pokemonInfo} />
      <PokemonDetailAbout pokemonInfo={pokemonInfo} />
      <PokemonDetailStats pokemonInfo={pokemonInfo} />
      <PokemonDetailMoves pokemonInfo={pokemonInfo} />
      <PokemonDetailSprites pokemonInfo={pokemonInfo} />
    </div>
  ) : (
    <Loader />
  )
}

export default PokemonDetail
