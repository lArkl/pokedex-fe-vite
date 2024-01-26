import ColorCell from './ColorCell'
import { FC } from 'react'
import Typography from '../../components/Typography'

const types = [
  'fire',
  'grass',
  'steel',
  'water',
  'psychic',
  'ground',
  'ice',
  'flying',
  'ghost',
  'normal',
  'poison',
  'rock',
  'fighting',
  'dark',
  'bug',
  'dragon',
  'electric',
  'fairy',
  'shadow',
  'unknow',
]

const PokemonTypesColors: FC<{
  mainClassName: string
  rowClassName: string
  textClassName: string
  cellClassName: string
}> = ({ mainClassName, rowClassName, textClassName }) => {
  return (
    <div className={mainClassName}>
      {types.map((pokemonType) => (
        <div className={rowClassName} key={pokemonType}>
          <Typography className={textClassName}>--color-{pokemonType}</Typography>
          <ColorCell token={`--color-${pokemonType}`} />
        </div>
      ))}
    </div>
  )
}
export default PokemonTypesColors
