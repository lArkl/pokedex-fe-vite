import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import PokemonListPage from './PokemonListPage'
import { server } from '../../mocks/server'
import { http, HttpResponse } from 'msw'
import { API_ENDPOINT } from '../../config/main'
import { customRender } from '../../context/TestProvider'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<PokemonListPage />} />
        <Route path={AppRoutes.PokemonDetail} element={<div>Detail</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PokemonListPage', () => {
  it('shows loader while fetching list', () => {
    renderComponent()

    expect(screen.getByRole('alert', { name: 'loading' })).toBeInTheDocument()
  })
  it('shows filter and list', async () => {
    renderComponent()

    expect(await screen.findByRole('button', { name: /search/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()

    expect(await screen.findAllByRole('heading', { name: /bulbasaur/i })).toHaveLength(2)
  })

  it('shows error page if fetch fails', async () => {
    server.use(
      http.get(`${API_ENDPOINT}/pokemons`, () => {
        return HttpResponse.json({ error: 'something went wrong' }, { status: 500 })
      }),
    )
    renderComponent()

    expect(await screen.findByLabelText('error')).toBeInTheDocument()
  })
})
