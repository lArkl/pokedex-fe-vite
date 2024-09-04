import { screen } from '@testing-library/react'
import PokemonDetailPage from './PokemonDetailPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import { server } from '../../mocks/server'
import { http, HttpResponse } from 'msw'
import { API_ENDPOINT } from '../../config/main'
import { customRender } from '../../context/TestProvider'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={[AppRoutes.PokemonDetail.replace(':id', '1')]}>
      <Routes>
        <Route path={AppRoutes.PokemonDetail} element={<PokemonDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PokemonDetailPage', () => {
  it('shows loader while fetching data', () => {
    renderComponent()

    expect(screen.getByRole('alert', { name: 'loading' })).toBeInTheDocument()
  })

  it('shows pokemon details', async () => {
    renderComponent()

    expect(await screen.findByTestId('PokemonDetailMain')).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
    expect(screen.getByLabelText('abilities')).toBeInTheDocument()
    expect(screen.getByLabelText(/moves/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/stats/i)).toBeInTheDocument()
  })

  it('shows error page if fetch fails', async () => {
    server.use(
      http.get(`${API_ENDPOINT}/pokemon/:id`, () => {
        return HttpResponse.json({ error: 'something went wrong' }, { status: 500 })
      }),
    )
    renderComponent()

    expect(await screen.findByLabelText('error')).toBeInTheDocument()
  })
})
