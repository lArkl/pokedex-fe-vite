import { getPokemonFromIdRequest, getPokemonTypes, getPokemonsListRequest } from './pokemon.requests.'
import { makePokemon } from '../mocks/factories/pokemon'
import { makePokemonTypes } from '../mocks/factories/pokemonAttributes'

describe('pokemon.requests', () => {
  describe('getPokemonFromId', () => {
    it('returns pokemon data from id', async () => {
      const data = await getPokemonFromIdRequest(1)

      expect(data).toEqual({ ...makePokemon(1), id: '1' })
    })
  })

  describe('getPokemonTypes', () => {
    it('returns pokemon types list', async () => {
      const data = await getPokemonTypes()

      expect(data).toEqual({ data: makePokemonTypes(3), error: null })
    })
  })

  describe('getPokemonsList', () => {
    it('returns pokemon list', async () => {
      const paginatedResult = await getPokemonsListRequest()

      const { name, id, spriteUrl, types } = makePokemon(1)
      expect(paginatedResult.data.items).toHaveLength(2)
      expect(paginatedResult.data.items[0]).toEqual({ name, id, spriteUrl, types })
    })

    it('returns pokemon list for page', async () => {
      const paginatedResult = await getPokemonsListRequest({ page: 1 })

      const { name, id, spriteUrl, types } = makePokemon(1)
      expect(paginatedResult.data.items).toHaveLength(2)
      expect(paginatedResult.data.items[0]).toEqual({ name, id, spriteUrl, types })
    })

    it('returns pokemon list for a name', async () => {
      const paginatedResult = await getPokemonsListRequest({ page: 1, name: 'ivi' })

      const { name, id, spriteUrl, types } = makePokemon(1)
      expect(paginatedResult.data.items).toHaveLength(2)
      expect(paginatedResult.data.items[0]).toEqual({ name, id, spriteUrl, types })
    })
  })
})
