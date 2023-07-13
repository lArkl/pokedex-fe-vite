import { fireEvent, render, screen, within } from '@testing-library/react'
import LoginPage from './LoginPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={AppRoutes.PokemonList} element={<div>List</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  it('renders component', async () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
  it('shows message', async () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument()
  })
  it('shows icons', async () => {
    renderComponent()

    const powered = screen.getByLabelText('icons')
    expect(within(powered).getAllByRole('img')).toHaveLength(2)
  })

  it('redirects to list when pressing search', async () => {
    renderComponent()

    const searchLink = screen.getByRole('link')
    expect(searchLink).toHaveTextContent(/search/i)
    fireEvent.click(searchLink)

    expect(await screen.findByText('List')).toBeInTheDocument()
  })
})
