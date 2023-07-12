import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PokemonListFilter from '.'

const onFilterMock = vi.fn()
const onClearMock = vi.fn()

const renderComponent = () => render(<PokemonListFilter onClear={onClearMock} onFilter={onFilterMock} />)

describe('PokemonListFilter', () => {
  beforeAll(() => {
    vi.resetAllMocks()
  })

  it('shows input and filter button', () => {
    renderComponent()

    expect(screen.getByRole('textbox', { name: /filter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument()
  })

  it('calls onFilter when pressing filter button', () => {
    renderComponent()

    const textInput = 'test'
    const filterInput = screen.getByRole('textbox', { name: /filter/i })
    fireEvent.change(filterInput, { target: { value: textInput } })

    const button = screen.getByRole('button', { name: /filter/i })
    fireEvent.click(button)

    expect(onFilterMock).toHaveBeenCalledWith(textInput)
  })

  it('shows clear button when there is text', () => {
    renderComponent()

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()

    const filterInput = screen.getByRole('textbox', { name: /filter/i })

    const textInput = 'test'
    fireEvent.change(filterInput, { target: { value: textInput } })
    expect(filterInput).toHaveValue(textInput)

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('calls onClear when pressing clear button', () => {
    renderComponent()

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()

    const filterInput = screen.getByRole('textbox', { name: /filter/i })

    fireEvent.change(filterInput, { target: { value: 'test' } })

    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clearButton)
    expect(onClearMock).toHaveBeenCalled()

    expect(filterInput).toHaveValue('')
  })
})
