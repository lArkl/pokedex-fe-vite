import { render, screen, within } from '@testing-library/react'
import PokemonDetail from './PokemonDetail'

describe('PokemonDetail', () => {
  it('renders component', async () => {
    render(<PokemonDetail />)

    expect(await screen.findByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
  })
  it('shows pokemon image', async () => {
    render(<PokemonDetail />)

    expect(await screen.findByRole('img', { name: /bulbasaur/i })).toBeInTheDocument()
  })

  it('shows type', async () => {
    render(<PokemonDetail />)

    expect(await screen.findByText(/type/i)).toBeInTheDocument()
  })

  it('shows abilities', async () => {
    render(<PokemonDetail />)

    const abilities = await screen.findByRole('region', { name: 'abilities' })
    expect(abilities).toBeInTheDocument()
    expect(within(abilities).getAllByRole('listitem')).toHaveLength(1)
  })

  it('shows moves', async () => {
    render(<PokemonDetail />)

    expect(await screen.findByText(/moves/i)).toBeInTheDocument()
  })

  it('shows stats', async () => {
    render(<PokemonDetail />)

    expect(await screen.findByText(/stats/i)).toBeInTheDocument()
  })
})
