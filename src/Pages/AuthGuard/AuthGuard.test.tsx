import { screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import AuthGuard from './AuthGuard'
import { customRender } from '../../context/TestProvider'
import userEvent from '@testing-library/user-event'
import { mockRequests } from '../../mocks/test.utils'
import { dateNowMock } from '../../mocks/handlers'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<AuthGuard>Hello</AuthGuard>} />
        <Route path={AppRoutes.Login} element={<div>Login page</div>} />
        <Route path={AppRoutes.UpdateProfile} element={<div>Update profile page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: dateNowMock, shouldAdvanceTime: true })
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('shows loader while fetching user data', () => {
    renderComponent()

    expect(screen.getByRole('alert', { name: 'loading' })).toBeInTheDocument()
  })
  it('shows guest options if not logged in an redirect to login', async () => {
    mockRequests({ loggedInUser: false })

    renderComponent()

    const loggedIn = await screen.findByText('Logged in as', { exact: false })
    expect(loggedIn).toHaveTextContent('Logged in as Guest')

    const loginButton = screen.getByRole('button', { name: 'Login' })
    await userEvent.click(loginButton)

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('shows user options if logged and redirect on logout', async () => {
    renderComponent()

    const loggedIn = await screen.findByText('Logged in as', { exact: false })
    expect(loggedIn).toHaveTextContent(/Logged in as jose/i)

    const logoutButton = screen.getByRole('button', { name: 'Logout' })

    await waitFor(() => expect(logoutButton).toBeEnabled())
    await userEvent.click(logoutButton)

    expect(await screen.findByText('Logged out')).toBeInTheDocument()

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('redirects to update profile page', async () => {
    renderComponent()

    const loggedIn = await screen.findByText('Logged in as', { exact: false })
    expect(loggedIn).toHaveTextContent(/Logged in as jose/i)

    const updateProfileButton = screen.getByRole('button', { name: 'Update profile' })

    await waitFor(() => expect(updateProfileButton).toBeEnabled())
    await userEvent.click(updateProfileButton)

    expect(screen.getByText('Update profile page')).toBeInTheDocument()
  })
})
