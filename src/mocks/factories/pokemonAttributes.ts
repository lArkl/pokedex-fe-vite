import { ListItemDto } from '../../requests/dto'

export const makePokemonTypes = (size = 2): ListItemDto[] =>
  Array.from({ length: size }, (_, id) => ({ id: id + 1, name: `t${id + 1}` }))
