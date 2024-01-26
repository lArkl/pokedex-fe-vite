import { render, screen } from '@testing-library/react'
import ErrorPage from './ErrorPage'

describe('ErrorPage', () => {
  it('renders component', async () => {
    const { asFragment } = render(<ErrorPage />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('shows message', async () => {
    render(<ErrorPage />)

    expect(screen.getByLabelText('error')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /reload/i })).toBeInTheDocument()
    expect(screen.getByText(/contact/)).toBeInTheDocument()
  })
})
