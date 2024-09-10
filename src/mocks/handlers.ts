import { http, HttpResponse } from 'msw'
import { PokemonDto, ResponseDto } from '../requests/dto'
import pokemonsListJson1 from './responses/pokemons1.json'
import pokemonJson from './responses/pokemon.json'
import { API_ENDPOINT } from '../config/main'
import { makePokemon } from './factories/pokemon'
import { makePokemonTypes } from './factories/pokemonAttributes'
import { makeUser } from './factories/user'

const refreshTokenExpirationDateMock = '2024-09-02T15:39:29.651Z'
export const dateNowMock = new Date('2024-09-02T15:34:29.651Z')

const authRefreshSuccessHandler = http.post(`${API_ENDPOINT}/auth/refresh`, () => {
  return HttpResponse.json({
    data: { expiration: refreshTokenExpirationDateMock },
  })
})

const userInfoSuccessHandler = http.get(`${API_ENDPOINT}/user`, () => {
  return HttpResponse.json({ data: makeUser(), error: null })
})

export const handlers = [
  http.get(`${API_ENDPOINT}/pokemon/:id`, ({ params }) => {
    const paramId = params.id

    const id = Array.isArray(paramId) ? (paramId?.[0] ?? 1) : paramId

    const response: ResponseDto<PokemonDto> = {
      data: makePokemon(id),
      error: pokemonJson.error,
    }
    return HttpResponse.json(response)
  }),
  http.get(`${API_ENDPOINT}/pokemons`, () => {
    // const offset = req.url.searchParams.get('offset')
    return HttpResponse.json(pokemonsListJson1)
  }),
  http.get(`${API_ENDPOINT}/types`, () => {
    const response = { data: makePokemonTypes(3), error: null }
    return HttpResponse.json(response)
  }),
  userInfoSuccessHandler,
  http.post(`${API_ENDPOINT}/user`, async ({ request }) => {
    const body = (await request.json()) as {
      firstname: string
    }
    return HttpResponse.json({ firstname: body.firstname })
  }),
  http.patch(`${API_ENDPOINT}/user`, async ({ request }) => {
    const body = (await request.json()) as {
      firstname: string
    }
    return HttpResponse.json({ firstname: body.firstname })
  }),
  http.post(`${API_ENDPOINT}/auth/signin`, () => {
    return HttpResponse.json(
      {
        data: { message: 'sign in successfully' },
      },
      {
        headers: {
          'Set-Cookie': 'accessToken=accesstoken; SameSite=Strict, refreshToken=accesstoken; SameSite=Strict',
        },
      },
    )
  }),
  authRefreshSuccessHandler,
  userInfoSuccessHandler,
  http.post(`${API_ENDPOINT}/auth/logout`, () => {
    return HttpResponse.json({
      data: { message: 'logged out' },
    })
  }),
]

export const userInfoErrorHandler = http.get(
  `${API_ENDPOINT}/user`,
  () => {
    return HttpResponse.json(
      {
        error: {
          name: 'AuthTokenError',
          message: 'Authentication token not found',
        },
      },
      { status: 401 },
    )
  },
  { once: true },
)

export const authRefreshErrorHandler = http.get(`${API_ENDPOINT}/user`, () => {
  return HttpResponse.json(
    {
      error: {
        name: 'RefreshTokenError',
        message: 'Refresh token not found',
      },
    },
    { status: 401 },
  )
})
