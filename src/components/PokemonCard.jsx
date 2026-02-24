import React from 'react'

function PokemonCard({pokemon}) {
    return (
        <li className='pokemon-card'>
            <figure>
                <img src={pokemon.sprites.other.dream_world.front_default} alt="" className='pokemon-image' />
            </figure>
            <h1 className='pokemon-name'>{pokemon.name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    <span>
                        {
                            pokemon.types.map((type,index) => type.type.name).join(', ')
                        }
                    </span>
                </p>
            </div>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span> Height:</span> {pokemon.height}
                </p>
                <p className="pokemon-info">
                    <span> Weight:</span> {pokemon.weight}
                </p>
                <p className="pokemon-info">
                    <span> speed:</span> {pokemon.stats[0].base_stat}
                </p>
            </div>

            <div className="grid-three-cols">
                <div className="pokemon-info">
                    <p>{pokemon.stats[0].base_stat}</p>
                    <span> Experience:</span>
                </div>
                <div className="pokemon-info">
                    <p>{pokemon.stats[1].base_stat}</p>
                    <span>Attack:</span>
                </div>
                <div className="pokemon-info">
                    <p>
                       {
                           pokemon.abilities.map((ability,index) => ability.ability.name).join(', ')
                       }
                    </p>
                    <span> Abilities: </span>
                </div>
            </div>
        </li>
    )
}

export default PokemonCard