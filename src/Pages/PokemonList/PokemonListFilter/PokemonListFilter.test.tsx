import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PokemonListFilter from '.'
import { PaginatedResult } from '../../../requests/types'
import { Pokemon } from '../../../requests/getPokemons'

const pokemonListMock: PaginatedResult<Pokemon> = {
  count: 1281,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      abilites: ['ab1', 'ab2'],
      moves: ['m1', 'm2'],
      stats: [{ name: 's1', value: 1 }],
      height: 1,
      weight: 1,
      id: 1,
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
    },
  ],
}

const setFilteredMock = vi.fn()

describe('PokemonListFilter', () => {
  it('shows input and filter button', () => {
    render(<PokemonListFilter pokemonListData={pokemonListMock} setFilteredPokemonListData={setFilteredMock} />)

    expect(screen.getByRole('textbox', { name: /filter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument()
  })

  it('calls setFilteredPokemonListData', () => {
    render(<PokemonListFilter pokemonListData={pokemonListMock} setFilteredPokemonListData={setFilteredMock} />)

    const button = screen.getByRole('button', { name: /filter/i })
    fireEvent.click(button)

    expect(setFilteredMock).toHaveBeenCalledWith(pokemonListMock.results)
  })

  it('shows clear button when there is text', () => {
    render(<PokemonListFilter pokemonListData={pokemonListMock} setFilteredPokemonListData={setFilteredMock} />)

    const filterInput = screen.getByRole('textbox', { name: /filter/i })
    fireEvent.change(filterInput, { target: { value: 'asd' } })

    expect(filterInput).toHaveValue('asd')
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })
})
