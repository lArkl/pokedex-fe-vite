import axios from 'axios'
import { API_ENDPOINT } from '../config/main'
import { ListEntry, PaginatedResult, Pokemon as PokemonEntry } from './types'

export interface Pokemon {
  name: string
  spriteUrl?: string
  abilites: string[]
  types: PokemonEntry['types']
  id: number
}

export const parsePokemon = (response: PokemonEntry): Pokemon => ({
  id: response.id,
  name: response.name,
  spriteUrl: response.sprites.other?.['official-artwork'].front_default,
  abilites: response.abilities.map((abl) => abl.ability.name),
  types: response.types,
})

export const getPokemonFromId = async (id: number) => {
  const { data } = await axios.get<PokemonEntry>(`${API_ENDPOINT}/pokemon/${id}`)
  return parsePokemon(data)
}

export const getPokemonFromUrl = async (url: string): Promise<Pokemon> => {
  const { data } = await axios.get<PokemonEntry>(url)
  return parsePokemon(data)
}

const PAGE_SIZE = 20
export const getPokemonsList = async (page = 0): Promise<PaginatedResult<Pokemon>> => {
  const offset = page * PAGE_SIZE
  const { data: response } = await axios.get<PaginatedResult<ListEntry>>(`${API_ENDPOINT}/pokemon?offset=${offset}`)
  const pokemonsEntries = await Promise.all(response.results.map((result) => getPokemonFromUrl(result.url)))
  return {
    ...response,
    results: pokemonsEntries,
  }
}
