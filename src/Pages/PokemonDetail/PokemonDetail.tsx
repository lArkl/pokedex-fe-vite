import { FC, useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { Pokemon, getPokemonFromId } from '../../requests/getPokemons'
import Typography from '../../components/Typography/Typography'

const PokemonDetail: FC = () => {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>()

  useEffect(() => {
    getPokemonFromId(1).then((data) => {
      setPokemonInfo(data)
    })
  }, [])

  return pokemonInfo ? (
    <div>
      <Typography>{pokemonInfo.name}</Typography>
      <img src={pokemonInfo.spriteUrl} alt={pokemonInfo.name} />
      <section aria-label="abilities">
        <h2>Abilities</h2>
        <ul>
          {pokemonInfo.abilites.map((abilityName, index) => (
            <li key={`ability-${index}`}>{abilityName}</li>
          ))}
        </ul>
      </section>
      <section aria-label="stats">
        <h2>stats</h2>
      </section>
      <div>Type</div>
      <div>Moves</div>
    </div>
  ) : (
    <Loader />
  )
}

export default PokemonDetail
