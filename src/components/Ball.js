import React from 'react';
import Pokecard from './Pokecard'
import pokeball from '../assets/pokeball.svg';
import logo from '../assets/logo.svg';
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

  // 807 max id
  // gen 1: 151
  // gen 2: 251
  selectPokemon = (id, timeout) => {
    //const id = 2; // this.getRandomId(1, 151)
    this.setState({ isLoading: true });

    // let animation play for 2s before fetching data
    setTimeout(() => {
      fetch(POKEMON_API + id) 
      .then(response => response.json())
      .then(pokemon =>
        fetch(pokemon.moves[this.getRandomId(0, pokemon.moves.length)].move.url) 
        .then(response => response.json())
        .then(moves => 
          fetch(POKEMON_SPECIES_API + id) 
          .then(response => response.json())
          .then(species => {
            if (species["evolves_from_species"] && !species["evolves_from_species"]["is_baby"]) { // not checking babies, gen 1 for now
              fetch(species["evolves_from_species"].url) 
              .then(response => response.json())
              .then(prevSpecies => 
                this.setState({ pokemon: {...pokemon, moves: [moves], species: {...species, evolves_from_species: prevSpecies} }, isLoading: false})
              )
            } else {
              this.setState({ pokemon: {...pokemon, moves: [moves], species }, isLoading: false})
            }
          })
        )
      );
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
        {pokemon ? <Pokecard pokemon={pokemon} handlePrev={this.selectPokemon}/> : <img src={pokeball} className="ball-img" onClick={() => this.selectPokemon(this.getRandomId(1, 151), 2000)} alt="Pokeball" />}
      </div>
    );
  }
}

export default Ball;