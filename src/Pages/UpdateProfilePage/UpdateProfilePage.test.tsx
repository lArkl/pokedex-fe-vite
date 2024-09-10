import { screen, waitFor } from '@testing-library/react'
import UpdateProfilePage from './UpdateProfilePage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import { customRender } from '../../context/TestProvider'
import userEvent from '@testing-library/user-event'
import { mockRequests } from '../../mocks/test.utils'
import { http, HttpResponse } from 'msw'
import { API_ENDPOINT } from '../../config/main'
import { makeUser } from '../../mocks/factories/user'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={[AppRoutes.UpdateProfile]}>
      <Routes>
        <Route path={AppRoutes.UpdateProfile} element={<UpdateProfilePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('UpdateProfilePage', () => {
  it('renders component', async () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('shows form', async () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /update user account!/i })).toBeInTheDocument()
    expect(screen.getByTestId('updateProfile')).toBeInTheDocument()
  })

  it('submits new profile data', async () => {
    const userData = makeUser()
    mockRequests({
      handlers: [
        http.patch(`${API_ENDPOINT}/user`, async ({ request }) => {
          const body = (await request.json()) as {
            firstname: string
          }
          return HttpResponse.json({ firstname: body.firstname })
        }),
      ],
    })

    const user = userEvent.setup()
    renderComponent()

    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    await waitFor(() => expect(emailInput).toHaveValue(userData.email))

    await user.clear(emailInput)
    await user.type(emailInput, 'a@a.com')

    const firstNameInput = screen.getByRole('textbox', { name: 'First Name' })
    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'jose')

    const lastNameInput = screen.getByRole('textbox', { name: 'Last Name' })
    await user.clear(lastNameInput)
    await user.type(lastNameInput, 'garcia')

    await user.click(screen.getByRole('button', { name: /Update profile/i }))

    expect(await screen.findByText('Profile updated successfully!')).toBeInTheDocument()
  })
})
