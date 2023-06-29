import { rest } from 'msw'

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemons', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            name: 'Bulbasaur',
            spriteUrl:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          },
        ],
        error: null,
      }),
    )
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon/132', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          name: 'Bulbasaur',
          spriteUrl:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          captureRate: 2,
          abilities: [
            {
              name: 'Drop',
            },
          ],
        },
        error: null,
      }),
    )
  }),
]
