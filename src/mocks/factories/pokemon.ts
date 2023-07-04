import { Pokemon } from '../../requests/getPokemons'

export const getPokemonMock = (id = 1): Pokemon => ({
  name: `bulbasaur${id ? id.toString() : ''}`,
  abilites: ['ab1', 'ab2'],
  moves: ['m1', 'm2'],
  stats: [{ name: 's1', value: 1 }],
  height: 1,
  weight: 1,
  id: id,
  types: [{ type: { name: 't1', url: '' }, slot: 1 }],
  sprites: {
    default: {
      frontUrl: '',
      backUrl: '',
    },
    shiny: {
      frontUrl: '',
      backUrl: '',
    },
  },
})
