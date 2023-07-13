import { FC, ReactNode, createContext, useEffect, useState, useContext } from 'react'
import { getPokemonTypes } from '../requests/getPokemons'
import { Option } from '../shared/types'
import { capitalize } from '../utils/strings'

export interface PokemonContextFields {
  types: Option[]
}

const initialState: PokemonContextFields = {
  types: [],
}

export const PokemonContext = createContext<PokemonContextFields>(initialState)

const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemonTypes, setPokemonTypes] = useState<Option[]>([])

  useEffect(() => {
    const controller = new AbortController()
    getPokemonTypes(controller.signal).then((response) => {
      setPokemonTypes(response.data.map(({ id, name }) => ({ label: capitalize(name), value: id })))
    })
    return () => {
      controller.abort()
    }
  }, [])

  return <PokemonContext.Provider value={{ types: pokemonTypes }}>{children}</PokemonContext.Provider>
}

export const UsePokemonContext = () => {
  return useContext(PokemonContext)
}

export default PokemonProvider
