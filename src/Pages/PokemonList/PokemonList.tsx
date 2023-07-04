import { FC, useEffect, useState } from 'react'
import { Pokemon, getPokemonsList } from '../../requests/getPokemons'
import { PaginatedResult } from '../../requests/types'
import Loader from '../../components/Loader'
import PokemonListItem from './PokemonListItem'
import styles from './PokemonList.module.scss'
import PokemonListFilter from './PokemonListFilter'

const PokemonList: FC = () => {
  const [pokemonListData, setPokemonListData] = useState<PaginatedResult<Pokemon>>()
  const [filteredPokemonList, setFilteredPokemonListData] = useState<Pokemon[]>([])

  useEffect(() => {
    getPokemonsList().then((data) => {
      setPokemonListData(data)
      setFilteredPokemonListData(data.results)
    })
  }, [])

  return pokemonListData ? (
    <div className={styles.container}>
      <PokemonListFilter pokemonListData={pokemonListData} setFilteredPokemonListData={setFilteredPokemonListData} />
      <section className={styles.list}>
        {filteredPokemonList.map((pokemon) => (
          <PokemonListItem key={pokemon.id} pokemonInfo={pokemon} />
        ))}
      </section>
    </div>
  ) : (
    <Loader />
  )
}

export default PokemonList
