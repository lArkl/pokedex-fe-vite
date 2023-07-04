import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PokemonListItem from './PokemonListItem'
import { AppRoutes } from '../../../routes/appRoutes'
import { getPokemonMock } from '../../../mocks/factories/pokemon'

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<PokemonListItem pokemonInfo={getPokemonMock()} />} />
        <Route path={AppRoutes.PokemonDetail} element={<div>Detail</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PokemonListItem', () => {
  it('renders component', () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByTestId('PokemonTypeBadge')).toBeInTheDocument()
  })

  it('redirects to pokemon detail', async () => {
    renderComponent()

    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(await screen.findByText('Detail')).toBeInTheDocument()
  })
})
