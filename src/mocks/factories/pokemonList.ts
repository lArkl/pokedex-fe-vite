import { Pokemon } from '../../requests/getPokemons'
import { PaginatedResult } from '../../requests/types'
import { makePokemon } from './pokemon'

export const makePokemonList = (size = 1): PaginatedResult<Pokemon> => ({
  count: 1281,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: Array.from({ length: size }, (_, id) => makePokemon(id + 1)),
})
