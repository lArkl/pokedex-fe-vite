import { getPokemonTypes } from '../requests/getPokemons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Option } from '../shared/types'

const usePokemonTypesQuery = (): UseQueryResult<Option[]> => {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: async ({ signal }) => {
      const { data, error } = await getPokemonTypes(signal)
      if (error) {
        throw error
      }
      return data.map(({ name, id }) => ({ label: name, value: id }))
    },
    staleTime: Infinity,
  })
}

export default usePokemonTypesQuery
