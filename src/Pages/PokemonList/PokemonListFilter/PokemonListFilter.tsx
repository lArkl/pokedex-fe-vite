import { FC, useState } from 'react'
import { Pokemon } from '../../../requests/getPokemons'
import { PaginatedResult } from '../../../requests/types'
import Button from '../../../components/Button'
import styles from './PokemonListFilter.module.scss'
import Input from '../../../components/Input'
import Typography from '../../../components/Typography/Typography'

interface PokemonListFilterProps {
  pokemonListData: PaginatedResult<Pokemon>
  setFilteredPokemonListData: (list: Pokemon[]) => void
}

const PokemonListFilter: FC<PokemonListFilterProps> = ({ pokemonListData, setFilteredPokemonListData }) => {
  const [filter, setFilter] = useState<string>('')

  const onFilter = () => {
    if (pokemonListData) {
      setFilteredPokemonListData(pokemonListData.results.filter((result) => result.name.includes(filter.toLowerCase())))
    }
  }

  const onClear = () => {
    setFilteredPokemonListData(pokemonListData.results)
    setFilter('')
  }
  return (
    <div className={styles.container}>
      <label htmlFor="filter">
        <Typography variant="md">Filter by name</Typography>
      </label>
      <Input id="filter" name="filter" value={filter} onChange={(evt) => setFilter(evt.target.value)} />
      <div className={styles.buttons}>
        <Button variant="primary" onClick={onFilter}>
          Filter
        </Button>
        {filter.length > 0 ? (
          <Button variant="secondary" className={styles.button} onClick={onClear}>
            Clear
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default PokemonListFilter
