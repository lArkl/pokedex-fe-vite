import { PaginatedResponseDto, PaginationDto, PokemonItemDto } from '../../requests/dto'

export const makePokemonItem = (id = 1): PokemonItemDto => ({
  name: `bulbasaur${id ? id.toString() : ''}`,
  spriteUrl: '',
  id: id,
  types: [
    { name: 't1', id: 1 },
    { name: 't2', id: 2 },
  ],
})
export const makePokemonList = (size = 1): PaginationDto<PokemonItemDto> => ({
  count: 1281,
  items: Array.from({ length: size }, (_, id) => makePokemonItem(id + 1)),
  page: 0,
  pageSize: 20,
  totalPages: 64,
})
