import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import PokemonList from '.'

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<PokemonList />} />
        <Route path={AppRoutes.PokemonDetail} element={<div>Detail</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PokemonList', () => {
  it('shows loader while fetching list', () => {
    renderComponent()

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
  it('shows filter and list', async () => {
    renderComponent()

    expect(await screen.findByRole('button', { name: /filter/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /filter/i })).toBeInTheDocument()

    expect(screen.getAllByRole('heading', { name: /bulbasaur/i }).length).toBeGreaterThan(0)
  })
})
