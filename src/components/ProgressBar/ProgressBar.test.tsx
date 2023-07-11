import { render, screen } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders component', async () => {
    render(<ProgressBar value={0} />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
