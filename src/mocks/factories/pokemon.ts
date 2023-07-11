import { PokemonDto } from '../../requests/dto'
import pokemonJson from '../responses/pokemon.json'

export const makePokemon = (id = 1): PokemonDto => {
  const pokemon = { ...pokemonJson.data }
  return {
    ...pokemon,
    id: id,
    name: `bulbasaur${id ? id.toString() : ''}`,
  }
}
