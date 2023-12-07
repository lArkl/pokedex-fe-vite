import { getPokemonsListRequest } from '../requests/pokemon.requests.'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PaginationDto, PokemonItemDto } from '../requests/dto'

const usePokemonListQuery = ({
  name,
  currentPage,
  typesIds,
  abilitiesIds,
}: Partial<{ name: string; currentPage: number; typesIds: number[]; abilitiesIds: number[] }>): UseQueryResult<
  PaginationDto<PokemonItemDto>,
  Error
> => {
  return useQuery({
    queryKey: ['pokemonList', { name, currentPage, typesIds, abilitiesIds }],
    queryFn: async ({ signal }) => {
      const response = await getPokemonsListRequest({
        name,
        page: currentPage,
        types: typesIds,
        abilities: abilitiesIds,
        signal,
      })
      return response.data
    },
  })
}

export default usePokemonListQuery
