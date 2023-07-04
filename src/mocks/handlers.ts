import { rest } from 'msw'
import { Pokemon } from '../requests/types'
import pokemonsListJson1 from './responses/pokemons1.json'
import pokemonJson from './responses/pokemon.json'

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/:id', (req, res, ctx) => {
    const { id } = req.params
    const pokemon: Pokemon = pokemonJson

    return res(ctx.status(200), ctx.json({ ...pokemon, name: `${pokemon.name}${id}`, id }))
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset')
    return res(ctx.status(200), ctx.json(pokemonsListJson1))
  }),
]
