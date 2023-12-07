import axios, { AxiosError } from 'axios'
import { API_ENDPOINT, PAGE_SIZE } from '../config/main'
import { ResponseDto, PaginatedResponseDto, PokemonDto, PokemonItemDto, ListItemDto } from './dto'
import { waitRequest } from './utils'

export const getPokemonFromIdRequest = async (id: number, signal?: AbortSignal): Promise<PokemonDto> => {
  const { data: response } = await waitRequest(
    axios.get<ResponseDto<PokemonDto>>(`${API_ENDPOINT}/pokemon/${id}`, { signal }),
  )
  return response.data
}

interface PokemonListParams {
  page?: number
  name?: string
  types?: number[]
  abilities?: number[]
  signal?: AbortSignal
}

export const getPokemonsListRequest = async ({ page, name, signal, abilities, types }: PokemonListParams = {}): Promise<
  PaginatedResponseDto<PokemonItemDto>
> => {
  try {
    const { data: response } = await waitRequest(
      axios.get<PaginatedResponseDto<PokemonItemDto>>(`${API_ENDPOINT}/pokemons`, {
        params: { page, name, pageSize: PAGE_SIZE, abilities, types },
        signal,
      }),
    )
    return response
  } catch (err) {
    if (err instanceof AxiosError && err.code === 'ERR_CANCELED') {
      return { data: { items: [], page: 1, count: 0, pageSize: PAGE_SIZE }, error: null }
    }
    throw err
  }
}

export const getPokemonTypes = async (signal?: AbortSignal): Promise<ResponseDto<ListItemDto[]>> => {
  const { data: response } = await axios.get<ResponseDto<ListItemDto[]>>(`${API_ENDPOINT}/types`, { signal })
  return response
}

export const getPokemonAbilities = async (
  params?: Partial<{ name: string; ids: number[] }>,
  signal?: AbortSignal,
): Promise<PaginatedResponseDto<ListItemDto>> => {
  const { data: response } = await axios.get<PaginatedResponseDto<ListItemDto>>(`${API_ENDPOINT}/abilities`, {
    params,
    signal,
  })
  return response
}

export const getPokemonAbilitiesByIds = async (
  name: string,
  signal?: AbortSignal,
): Promise<PaginatedResponseDto<ListItemDto>> => {
  const { data: response } = await axios.get<PaginatedResponseDto<ListItemDto>>(`${API_ENDPOINT}/abilities`, {
    params: { name },
    signal,
  })
  return response
}
