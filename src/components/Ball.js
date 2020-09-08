import React from 'react';
import Pokecard from './Pokecard'
import pokeball from '../assets/pokeball.svg';
import logo from '../assets/logo.svg';

// TODO: create & move to config file
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_SPECIES_API = 'https://pokeapi.co/api/v2/pokemon-species/';

class Ball extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: null,
      isLoading: false,
    };
  }

  getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // TODO: add multiple moves
  selectMoveSet = (moves) => {
    let moveSet = [];
    const moveId1 = this.getRandomId(0, moves.length-1);
    //const moveId2 = this.getRandomId(0, moves.length-1);
    moveSet.push(moves[moveId1]);
    //moveSet.push(moves[moveId2]);
    return moveSet;
	}

  resetPokemon = () => {
    this.setState({ pokemon: null });
  }

  selectPokemon = async (id, timeout = 0) => {
    this.setState({ isLoading: true });

    const pokemonRes = await fetch(POKEMON_API + id);
    const pokemon = await pokemonRes.json();

    const movesRes = await fetch(pokemon.moves[this.getRandomId(0, pokemon.moves.length)].move.url);
    const moves = await movesRes.json();

    const typeRes = await fetch(pokemon.types[0].type.url);
    const type = await typeRes.json();
    
    const speciesRes = await fetch(POKEMON_SPECIES_API + id);
    const species = await speciesRes.json();

    if (species["evolves_from_species"] && !species["evolves_from_species"]["is_baby"]) { // not checking babies, gen 1 for now
      const prevSpeciesRes = await fetch(species["evolves_from_species"].url);
      const prevSpecies = await prevSpeciesRes.json();
      this.setState({ pokemon: {...pokemon, moves: [moves], type, species: {...species, evolves_from_species: prevSpecies} }})
    } else {
      this.setState({ pokemon: {...pokemon, moves: [moves], type, species }})
    }

    // let animation play
    setTimeout(() => {
      this.setState({isLoading: false})
    }, timeout);
    
  }

  render() {
    const { pokemon, isLoading } = this.state;
    
    if (isLoading) {
      return (
        <div className="container">
          <img src={logo} className="pokemon-logo" onClick={this.resetPokemon} alt="Pokemon Logo" />
          <img src={pokeball} className="ball-img anim" alt="Pokeball" />
        </div>
      );
    }

    return (
      <div className="container">
        <img src={logo} className="pokemon-logo" onClick={this.resetPokemon} alt="Pokemon Logo" />
        {pokemon ? <Pokecard pokemon={pokemon} handlePrev={this.selectPokemon}/> : <img src={pokeball} className="ball-img" onClick={() => this.selectPokemon(this.getRandomId(1, 151), 1000)} alt="Pokeball" />}
      </div>
    );
  }
}

export default Ball;