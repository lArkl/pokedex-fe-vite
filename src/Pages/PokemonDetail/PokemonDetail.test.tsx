import { render, screen, within } from '@testing-library/react'
import PokemonDetail from './PokemonDetail'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={[`${AppRoutes.PokemonList}/1`]}>
      <Routes>
        <Route path={AppRoutes.PokemonDetail} element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PokemonDetail', () => {
  it('shows loader while fetching list', () => {
    renderComponent()

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders component', async () => {
    renderComponent()

    expect(await screen.findByTestId('PokemonDetailMain')).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
    expect(screen.getByLabelText('abilities')).toBeInTheDocument()
    expect(screen.getByLabelText(/moves/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/stats/i)).toBeInTheDocument()
  })
})
