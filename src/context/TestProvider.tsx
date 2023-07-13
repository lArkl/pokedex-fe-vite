import { RenderOptions, render } from '@testing-library/react'
import { ReactElement } from 'react'
import { PokemonContext } from './PokemonProvider'

const TestProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PokemonContext.Provider
      value={{
        types: [
          { label: 't1', value: 1 },
          { label: 't2', value: 2 },
          { label: 't3', value: 3 },
        ],
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TestProvider, ...options })
