import { render, screen, within } from '@testing-library/react'
import PokemonDetailStats from './PokemonDetailStats'
import { makePokemon } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailStats pokemonInfo={makePokemon()} className={className} />)
}

describe('PokemonDetailStats', () => {
  it('renders component', async () => {
    renderComponent()

    expect(screen.getByLabelText('stats')).toBeInTheDocument()
  })

  it('shows default sprites', async () => {
    renderComponent()

    const stats = screen.getByRole('list')
    expect(within(stats).getAllByRole('listitem')).toHaveLength(1)
  })

  it('accepts className', async () => {
    renderComponent('class')

    expect(screen.getByLabelText('stats')).toHaveClass('class')
  })
})
