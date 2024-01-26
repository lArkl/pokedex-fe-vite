import { screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import AuthGuard from './AuthGuard'
import { customRender } from '../../context/TestProvider'
import userEvent from '@testing-library/user-event'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<AuthGuard>Hello</AuthGuard>} />
        <Route path={AppRoutes.Login} element={<div>Login</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AuthGuard', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'test-token')
  })
  afterAll(() => {
    window.localStorage.clear()
  })
  it('shows loader while fetching list', () => {
    renderComponent()

    expect(screen.getByRole('alert', { name: 'loading' })).toBeInTheDocument()
  })
  it('shows guest options if not logged in', async () => {
    window.localStorage.clear()
    renderComponent()

    const loggedIn = await screen.findByText('Logged in as', { exact: false })
    expect(loggedIn).toHaveTextContent('Logged in as Guest')

    const loginButton = screen.getByRole('button', { name: 'Login' })
    await userEvent.click(loginButton)

    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('shows user options if logged in', async () => {
    renderComponent()

    const loggedIn = await screen.findByText('Logged in as', { exact: false })
    expect(loggedIn).toHaveTextContent('Logged in as jose')

    const loginButton = screen.getByRole('button', { name: 'Logout' })
    await userEvent.click(loginButton)

    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
