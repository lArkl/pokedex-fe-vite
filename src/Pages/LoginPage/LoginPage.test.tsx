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
    renderComponent()

    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument()
    const powered = screen.getByLabelText('icons')
    expect(within(powered).getAllByRole('img')).toHaveLength(2)

    expect(screen.getByRole('link')).toHaveTextContent(/search/i)
  })

  it('redirects to list when pressing search', async () => {
    renderComponent()

    const searchLink = screen.getByRole('link')
    fireEvent.click(searchLink)

    expect(await screen.findByText('List')).toBeInTheDocument()
  })
})
