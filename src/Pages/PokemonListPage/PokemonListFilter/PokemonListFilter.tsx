import { FC, useEffect, useMemo } from 'react'
import Button from '../../../components/Button'
import styles from './PokemonListFilter.module.scss'
import Input from '../../../components/Input'
import { UsePokemonContext } from '../../../context/PokemonProvider'
import MultiSelect from '../../../components/MultiSelect'
import { Option } from '../../../shared/types'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Fieldset from '../../../components/Fieldset/Fieldset'

interface FilterFormProps {
  name: string
  types: Option[]
}

interface PokemonListFilterProps {
  onFilter: () => void
  onClear?: () => void
}

const PokemonListFilter: FC<PokemonListFilterProps> = ({ onFilter, onClear }) => {
  const pokemonContextData = UsePokemonContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialValues = useMemo(
    () => ({
      name: searchParams.get('name') ?? '',
      types: searchParams
        .getAll('types')
        .map((value) => pokemonContextData.types.find((option) => option.value === parseInt(value))) as Option[],
    }),
    [pokemonContextData.types, searchParams],
  )

  const { control, handleSubmit, reset } = useForm<FilterFormProps>({ defaultValues: { name: '', types: [] } })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  return (
    <form
      data-testid="list_filter"
      className={styles.container}
      onSubmit={handleSubmit((data) => {
        const params = new URLSearchParams({
          name: data.name,
        })
        data.types.forEach((typeOption) => {
          params.append('types', typeOption.value.toString())
        })
        onFilter()
        setSearchParams(params)
      })}
    >
      <Fieldset name="name" label="Pokemon Name">
        <Input control={control} name="name" />
      </Fieldset>
      <Fieldset name="types" label="Pokemon Types">
        <MultiSelect options={pokemonContextData.types} name="types" control={control} />
      </Fieldset>
      <div className={styles.buttons}>
        <Button variant="primary">Search</Button>
        <Button
          variant="secondary"
          type="button"
          className={styles.button}
          onClick={() => {
            onClear?.()
            setSearchParams()
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}

export default PokemonListFilter
