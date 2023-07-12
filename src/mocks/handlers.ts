import { rest } from 'msw'
import { ListItemDto, PokemonDto, ResponseDto } from '../requests/dto'
import pokemonsListJson1 from './responses/pokemons1.json'
import pokemonJson from './responses/pokemon.json'
import { API_ENDPOINT } from '../config/main'
import { makePokemon } from './factories/pokemon'
import { makePokemonTypes } from './factories/pokemonAttributes'

export const handlers = [
  rest.get(`${API_ENDPOINT}/pokemon/:id`, (req, res, ctx) => {
    const paramId = req.params.id

    const id = Array.isArray(paramId) ? paramId?.[0] ?? 1 : paramId

    const response: ResponseDto<PokemonDto> = {
      data: makePokemon(id),
      error: pokemonJson.error,
    }
    return res(ctx.status(200), ctx.json(response))
  }),
  rest.get(`${API_ENDPOINT}/pokemons`, (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset')
    return res(ctx.status(200), ctx.json(pokemonsListJson1))
  }),
  rest.get(`${API_ENDPOINT}/types`, (req, res, ctx) => {
    const response: ResponseDto<ListItemDto[]> = { data: makePokemonTypes(3), error: null }
    return res(ctx.status(200), ctx.json(response))
  }),
]
