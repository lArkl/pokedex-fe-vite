import { FC, useState } from 'react'
import Button from '../../../components/Button'
import styles from './PokemonListFilter.module.scss'
import Input from '../../../components/Input'
import Typography from '../../../components/Typography/Typography'

interface PokemonListFilterProps {
  initialValue?: string
  onFilter: (filterField: string) => void
  onClear: () => void
}

const PokemonListFilter: FC<PokemonListFilterProps> = ({ onFilter, onClear, initialValue = '' }) => {
  const [filterField, setFilterField] = useState<string>(initialValue)

  return (
    <div className={styles.container}>
      <label htmlFor="filter">
        <Typography variant="md">Filter by name</Typography>
      </label>
      <Input id="filter" name="filter" value={filterField} onChange={(evt) => setFilterField(evt.target.value)} />
      <div className={styles.buttons}>
        <Button variant="primary" onClick={() => onFilter(filterField)}>
          Filter
        </Button>
        {filterField.length > 0 ? (
          <Button
            variant="secondary"
            className={styles.button}
            onClick={() => {
              setFilterField('')
              onClear()
            }}
          >
            Clear
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default PokemonListFilter
