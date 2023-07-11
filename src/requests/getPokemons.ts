import axios from 'axios'
import { API_ENDPOINT } from '../config/main'
import { ResponseDto, PaginatedResponseDto, PokemonDto, PokemonItemDto } from './dto'

const DELAY_TIME = 500

const waitRequest = async <T>(promise: Promise<T>, delay = DELAY_TIME) => {
  const [, result] = await Promise.all([new Promise((resolve) => setTimeout(resolve, delay)), promise])
  return result
}

export const getPokemonFromId = async (id: number): Promise<PokemonDto> => {
  const { data: response } = await waitRequest(axios.get<ResponseDto<PokemonDto>>(`${API_ENDPOINT}/pokemon/${id}`))
  return response.data
}

const PAGE_SIZE = 20

interface PokemonListParams {
  page?: number
  name?: string
  signal?: AbortSignal
}

export const getPokemonsList = async ({ page, name, signal }: PokemonListParams = {}): Promise<
  PaginatedResponseDto<PokemonItemDto>
> => {
  const { data: response } = await waitRequest(
    axios.get<PaginatedResponseDto<PokemonItemDto>>(`${API_ENDPOINT}/pokemons`, {
      params: { page, name, pageSize: PAGE_SIZE },
      signal,
    }),
  )
  return response
}
