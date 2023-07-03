import { fireEvent, render, screen } from '@testing-library/react'
import Input from './Input'
import { vi } from 'vitest'

describe('Loader', () => {
  it('renders component', async () => {
    render(<Input />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('accepts a className', async () => {
    render(<Input className="class" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('class')
  })

  it('should fire on change', async () => {
    let text
    const onChangeMock = vi.fn().mockImplementation((evt) => {
      text = evt.target.value
    })
    render(<Input onChange={onChangeMock} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(onChangeMock).toHaveBeenCalled()
    expect(text).toBe('test')
  })
})
