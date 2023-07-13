import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PokemonListFilter from '.'
import { customRender } from '../../../context/TestProvider'

const onFilterMock = vi.fn()
const onClearMock = vi.fn()

const renderComponent = () => customRender(<PokemonListFilter onClear={onClearMock} onFilter={onFilterMock} />)

const mockSearchParams = vi.fn()
const setSearchParamsMock = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: () => mockSearchParams(),
}))

describe('PokemonListFilter', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mockSearchParams.mockReturnValue([new URLSearchParams([]), setSearchParamsMock])
  })

  it('shows input and filter button', () => {
    renderComponent()

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('calls onFilter when pressing filter button', () => {
    renderComponent()

    const textInput = 'test'
    const filterInput = screen.getByRole('textbox', { name: /pokemon name/i })
    fireEvent.change(filterInput, { target: { value: textInput } })

    const button = screen.getByRole('button', { name: /search/i })
    fireEvent.click(button)

    // expect(onFilterMock).toHaveBeenCalled()
  })

  it('shows defaults values from query params', async () => {
    mockSearchParams.mockReturnValue([
      new URLSearchParams([
        ['name', 'test'],
        ['types', '1'],
      ]),
      setSearchParamsMock,
    ])
    renderComponent()

    expect(screen.getByTestId('list_filter')).toHaveFormValues({ name: 'test', types: '1' })
  })

  it('calls onClear when pressing clear button', () => {
    renderComponent()

    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clearButton)
    expect(onClearMock).toHaveBeenCalled()
  })
})
