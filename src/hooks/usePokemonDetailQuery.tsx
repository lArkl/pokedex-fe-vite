import { getPokemonFromIdRequest } from '../requests/pokemon.requests.'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PokemonDto } from '../requests/dto'

const usePokemonDetailQuery = (id: number): UseQueryResult<PokemonDto, Error> => {
  return useQuery({
    queryKey: ['pokemonDetail', { id }],
    queryFn: async ({ signal }) => {
      return getPokemonFromIdRequest(id, signal)
    },
  })
}

export default usePokemonDetailQuery
