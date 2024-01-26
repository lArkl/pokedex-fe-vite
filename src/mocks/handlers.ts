import { rest } from 'msw'
import { PokemonDto, ResponseDto } from '../requests/dto'
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
  rest.get(`${API_ENDPOINT}/types`, (_, res, ctx) => {
    const response = { data: makePokemonTypes(3), error: null }
    return res(ctx.status(200), ctx.json(response))
  }),
  rest.get(`${API_ENDPOINT}/users/validate`, (req, res, ctx) => {
    const user = {
      firstname: 'jose',
      lastname: 'garcia',
      id: 18,
      updatedAt: '2023-12-08T09:36:34.000Z',
      token: 'sdhfEWRtndf',
    }
    return res(ctx.status(200), ctx.json({ data: user, error: null }))
  }),
  rest.post(`${API_ENDPOINT}/users/signup`, async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.status(200), ctx.json({ firstname: body.firstname }))
  }),
  rest.post(`${API_ENDPOINT}/users/signin`, async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.status(200), ctx.json({ firstname: body.firstname, token: 'test-token' }))
  }),
]
