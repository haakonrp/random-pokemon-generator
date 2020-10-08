import React from 'react';
import Pokecard from './Pokecard'
import pokeball from '../assets/pokeball.svg';
import logo from '../assets/logo.svg';
import { useState } from 'react';

// TODO: create & move to config file
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_SPECIES_API = 'https://pokeapi.co/api/v2/pokemon-species/';

const Ball = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // TODO: add multiple moves
  const selectMoveSet = (moves) => {
    let moveSet = [];
    const moveId1 = getRandomId(0, moves.length-1);
    //const moveId2 = this.getRandomId(0, moves.length-1);
    moveSet.push(moves[moveId1]);
    //moveSet.push(moves[moveId2]);
    return moveSet;
	}

  const resetPokemon = () => {
    setData(null);
  }

  const selectPokemon = async (id, timeout = 0) => {
    setIsLoading(true)

    const pokemonRes = await fetch(POKEMON_API + id);
    const pokemon = await pokemonRes.json();

    const movesRes = await fetch(pokemon.moves[getRandomId(0, pokemon.moves.length)].move.url);
    const moves = await movesRes.json();

    const typeRes = await fetch(pokemon.types[0].type.url);
    const type = await typeRes.json();
    
    const speciesRes = await fetch(POKEMON_SPECIES_API + id);
    const species = await speciesRes.json();

    if (species["evolves_from_species"] && !species["evolves_from_species"]["is_baby"]) { // not checking babies, gen 1 for now
      const prevSpeciesRes = await fetch(species["evolves_from_species"].url);
      const prevSpecies = await prevSpeciesRes.json();
      const prevPokemonRes = await fetch(POKEMON_API + prevSpecies.id);
      const prevPokemon = await prevPokemonRes.json();
      setData({ pokemon: {...pokemon, moves: [moves], type, species: {...species, evolves_from_species: prevPokemon} }})
    } else {
      setData({ pokemon: {...pokemon, moves: [moves], type, species }})
    }

    // let animation play
    setTimeout(() => {
      setIsLoading(false)
    }, timeout);
    
  }

  return isLoading ? 
  (
    <div className="container">
      <img src={logo} className="pokemon-logo no-drag" onClick={resetPokemon} alt="Pokemon Logo" />
      <img src={pokeball} className="ball-img anim no-drag" alt="Pokeball" />
    </div>
  ) 
  : 
  (
    <div className="container">
      <img src={logo} className="pokemon-logo no-drag" onClick={resetPokemon} alt="Pokemon Logo" />
      {data ? <Pokecard pokemon={data.pokemon} handlePrev={selectPokemon}/> : <img src={pokeball} className="ball-img no-drag" onClick={() => selectPokemon(getRandomId(1, 151), 1000)} alt="Pokeball" />}
    </div>
  )
}

export default Ball;