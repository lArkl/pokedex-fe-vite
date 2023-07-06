import { render, screen } from '@testing-library/react'
import PokemonDetailMain from './PokemonDetailMain'
import { getPokemonMock } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailMain pokemonInfo={getPokemonMock()} className={className} />)
}

describe('PokemonDetailMain', () => {
  it('renders component', async () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByTestId('PokemonTypeBadge')).toBeInTheDocument()
  })

  it('accepts className', async () => {
    renderComponent('class')

    expect(screen.getByTestId('PokemonDetailMain')).toHaveClass('class')
  })
})
