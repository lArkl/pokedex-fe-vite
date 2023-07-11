import { getPokemonFromId, getPokemonsList } from './getPokemons'
import { makePokemon } from '../mocks/factories/pokemon'

describe('getPokemons', () => {
  describe('getPokemonFromId', () => {
    it('returns pokemon data from id', async () => {
      const data = await getPokemonFromId(1)

      expect(data).toEqual({ ...makePokemon(1), id: '1' })
    })
  })

  describe('getPokemonsList', () => {
    it('returns pokemon list', async () => {
      const paginatedResult = await getPokemonsList()

      const { name, id, spriteUrl, types } = makePokemon(1)
      expect(paginatedResult.data.items).toHaveLength(2)
      expect(paginatedResult.data.items[0]).toEqual({ name, id, spriteUrl, types })
    })

    it('returns pokemon list for page', async () => {
      const paginatedResult = await getPokemonsList({ page: 1 })

      const { name, id, spriteUrl, types } = makePokemon(1)
      expect(paginatedResult.data.items).toHaveLength(2)
      expect(paginatedResult.data.items[0]).toEqual({ name, id, spriteUrl, types })
    })

    it('returns pokemon list for a name', async () => {
      const paginatedResult = await getPokemonsList({ page: 1, name: 'ivi' })

      const { name, id, spriteUrl, types } = makePokemon(1)
      expect(paginatedResult.data.items).toHaveLength(2)
      expect(paginatedResult.data.items[0]).toEqual({ name, id, spriteUrl, types })
    })
  })
})
