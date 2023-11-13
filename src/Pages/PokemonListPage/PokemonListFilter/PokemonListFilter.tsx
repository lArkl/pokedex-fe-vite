import { FC, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import styles from './PokemonListFilter.module.scss'
import Input from '../../../components/Input'
import MultiSelect from '../../../components/MultiSelect'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Fieldset from '../../../components/Fieldset/Fieldset'
import { getPokemonAbilities } from '../../../requests/getPokemons'
import { FilterFormProps, formatFilterParams, parseFilterParams } from './pokemonListFilter.utils'
import usePokemonTypesQuery from '../../../hooks/usePokemonTypesQuery'
import usePokemonAbilitesQuery from '../../../hooks/usePokemonAbilitesQuery'
import { InputActionMeta } from 'react-select'

interface PokemonListFilterProps {
  onFilter?: () => void
  onClear?: () => void
}

const PokemonListFilter: FC<PokemonListFilterProps> = ({ onFilter, onClear }) => {
  const { data: pokemonTypes } = usePokemonTypesQuery()

  const [abilityText, setAbilityText] = useState('')
  const { data: abilitiesList, isFetching: isFetchingAbilities } = usePokemonAbilitesQuery(
    { name: abilityText },
    abilityText.length > 3,
  )

  const handleInputChange = (inputText: string, meta: InputActionMeta) => {
    if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
      setAbilityText(inputText)
    }
  }

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
      const types = pokemonTypes?.filter((type) => typesIds.includes(type.value)) ?? []
      reset({
        name,
        types,
        abilities,
      })
    }
    resetForm()
  }, [pokemonTypes, reset, searchParams])

  return (
    <form
      data-testid="list_filter"
      className={styles.container}
      onSubmit={handleSubmit((data) => {
        onFilter?.()
        setSearchParams(formatFilterParams(data))
      })}
    >
      <Fieldset name="name" label="Pokemon Name">
        <Input control={control} name="name" />
      </Fieldset>
      <Fieldset name="types" label="Pokemon Types">
        <MultiSelect options={pokemonTypes} name="types" control={control} />
      </Fieldset>
      <Fieldset name="abilities" label="Pokemon Abilities">
        <MultiSelect
          options={abilitiesList}
          name="abilities"
          control={control}
          isLoading={isFetchingAbilities}
          onInputChange={handleInputChange}
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
