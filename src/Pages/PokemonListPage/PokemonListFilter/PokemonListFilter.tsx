import { FC, useEffect, useRef } from 'react'
import Button from '../../../components/Button'
import styles from './PokemonListFilter.module.scss'
import Input from '../../../components/Input'
import { UsePokemonContext } from '../../../context/PokemonProvider'
import MultiSelect from '../../../components/MultiSelect'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Fieldset from '../../../components/Fieldset/Fieldset'
import { getPokemonAbilities } from '../../../requests/getPokemons'
import { FilterFormProps, formatFilterParams, parseFilterParams } from './pokemonListFilter.utils'

interface PokemonListFilterProps {
  onFilter: () => void
  onClear?: () => void
}

const PokemonListFilter: FC<PokemonListFilterProps> = ({ onFilter, onClear }) => {
  const pokemonContextData = UsePokemonContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const { control, handleSubmit, reset } = useForm<FilterFormProps>({ defaultValues: { name: '', types: [] } })

  useEffect(() => {
    const resetForm = async () => {
      const { abilitiesIds, typesIds, name } = parseFilterParams(searchParams)
      const abilities = abilitiesIds?.length
        ? await getPokemonAbilities({ ids: abilitiesIds }).then((response) =>
            response.data.items.map(({ id, name }) => ({ label: name, value: id })),
          )
        : []
      const types = pokemonContextData.types.filter((type) => typesIds.includes(type.value))
      reset({
        name,
        types,
        abilities,
      })
    }
    resetForm()
  }, [pokemonContextData.types, reset, searchParams])

  const timeoutRef = useRef<NodeJS.Timeout>()

  return (
    <form
      data-testid="list_filter"
      className={styles.container}
      onSubmit={handleSubmit((data) => {
        onFilter()
        setSearchParams(formatFilterParams(data))
      })}
    >
      <Fieldset name="name" label="Pokemon Name">
        <Input control={control} name="name" />
      </Fieldset>
      <Fieldset name="types" label="Pokemon Types">
        <MultiSelect options={pokemonContextData.types} name="types" control={control} />
      </Fieldset>
      <Fieldset name="abilities" label="Pokemon Abilities">
        <MultiSelect
          loadOptions={async (inputValue) => {
            return new Promise((resolve) => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
              }
              timeoutRef.current = setTimeout(async () => {
                getPokemonAbilities({ name: inputValue })
                  .then(({ data }) => {
                    return data.items.map(({ id, name }) => ({ label: name, value: id }))
                  })
                  .then(resolve)
              }, 1000)
            })
          }}
          name="abilities"
          control={control}
        />
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
