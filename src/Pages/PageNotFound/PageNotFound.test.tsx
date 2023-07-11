import { render, screen } from '@testing-library/react'
import PageNotFound from './PageNotFound'

describe('PageNotFound', () => {
  it('renders component', async () => {
    render(<PageNotFound />)

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
    expect(screen.getByText(/not found/)).toBeInTheDocument()
  })
})
