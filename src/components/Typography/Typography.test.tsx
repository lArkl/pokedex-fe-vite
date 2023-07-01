import { render, screen } from '@testing-library/react'
import Typography from './Typography'

describe('PokemonDetail', () => {
  it('renders component', async () => {
    render(<Typography>text</Typography>)
    const text = screen.getByText('text')
    expect(text).toBeInTheDocument()
  })

  it('shows small size', async () => {
    render(<Typography size="sm">text</Typography>)
    const text = screen.getByText('text')
    expect(text).toBeInTheDocument()
  })
  it('shows medium size', async () => {
    render(<Typography size="md">text</Typography>)
    const text = screen.getByText('text')
    expect(text).toBeInTheDocument()
  })
  it('shows large size', async () => {
    render(<Typography size="lg">text</Typography>)
    const text = screen.getByText('text')
    expect(text).toBeInTheDocument()
  })
})
