import { Option } from '../../../shared/types'

export enum PokemonFilterParams {
  Types = 'types',
  Abilities = 'abilities',
  Name = 'name',
}

export interface FilterFormProps {
  name: string
  types: Option[]
  abilities: Option[]
}

export const formatFilterParams = (data: FilterFormProps): URLSearchParams => {
  const params = new URLSearchParams({
    [PokemonFilterParams.Name]: data.name,
  })
  data.types.forEach((option) => {
    params.append(PokemonFilterParams.Types, option.value.toString())
  })
  data.abilities.forEach((option) => {
    params.append(PokemonFilterParams.Abilities, option.value.toString())
  })
  return params
}

export const parseFilterParams = (searchParams: URLSearchParams) => {
  const abilitiesIds = searchParams.getAll(PokemonFilterParams.Abilities).map((value) => parseInt(value))
  const typesIds = searchParams.getAll(PokemonFilterParams.Types).map((value) => parseInt(value))
  return {
    typesIds,
    abilitiesIds,
    name: searchParams.get(PokemonFilterParams.Name) ?? '',
  }
}
