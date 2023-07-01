import { getPokemonFromId, getPokemonFromUrl, getPokemonsList } from './getPokemons'

describe('getPokemons', () => {
  const pokemonMock = {
    name: 'bulbasaur1',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    abilites: ['overgrow', 'chlorophyll'],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      },
    ],
  }
  describe('getPokemonFromId', () => {
    it('returns pokemon data from id', async () => {
      const data = await getPokemonFromId(1)
      expect(data).toEqual(pokemonMock)
    })
  })

  describe('getPokemonFromUrl', () => {
    it('returns pokemon data from url', async () => {
      const data = await getPokemonFromUrl('https://pokeapi.co/api/v2/pokemon/1')
      expect(data).toEqual(pokemonMock)
    })
  })
  describe('getPokemonsList', () => {
    it('returns pokemon list', async () => {
      const list = await getPokemonsList()

      expect(list.results).toHaveLength(20)
      expect(list.results[0]).toEqual(pokemonMock)
    })

    it('returns pokemon list for page', async () => {
      const list = await getPokemonsList(1)

      expect(list.results).toHaveLength(20)
      expect(list.results[0]).toEqual(pokemonMock)
    })
  })
})
