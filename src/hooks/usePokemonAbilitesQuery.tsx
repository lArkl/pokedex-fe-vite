import { getPokemonAbilities } from '../requests/pokemon.requests.'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Option } from '../shared/types'

const usePokemonAbilitesQuery = (
  params: Partial<{ name: string; ids: number[] }>,
  enabled = true,
): UseQueryResult<Option[]> => {
  return useQuery({
    queryKey: ['pokemonAbilites', params],
    queryFn: async ({ signal }) => {
      const { data, error } = await getPokemonAbilities(params, signal)
      if (error) {
        throw error
      }
      return data.items.map(({ name, id }) => ({ label: name, value: id }))
    },
    enabled,
    staleTime: Infinity,
  })
}

export default usePokemonAbilitesQuery
