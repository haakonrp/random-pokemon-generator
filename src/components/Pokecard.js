import React from 'react';
import { Dragon0, Dragon1, Dragon2, Electric0, Electric1, Electric2, Fighting0, Fighting1, Fighting2, Fire0, Fire1, Fire2, Grass0, Grass1, Grass2, Normal0, Normal1, Normal2, Psychic0, Psychic1, Psychic2, Water0, Water1, Water2, ElectricSymbol, FightingSymbol, FireSymbol, GrassSymbol, NormalSymbol, PsychicSymbol, WaterSymbol } from '../assets';
const useMetricSystem = true;

class Pokecard extends React.Component {

	// TODO: find easier solution
	selectCard = (type, stage) => {
		let cardSrc;

		switch (type) {
			case "dragon":
				switch (stage) {
					case 0:
						cardSrc = Dragon0;
						break;
					case 1:
						cardSrc = Dragon1;
						break;
					case 2:
						cardSrc = Dragon2;
						break;
					default:
						cardSrc = Dragon0;
						break;
				}
				break;

			case "electric":
				switch (stage) {
					case 0:
						cardSrc = Electric0;
						break;
					case 1:
						cardSrc = Electric1;
						break;
					case 2:
						cardSrc = Electric2;
						break;
					default:
						cardSrc = Electric0;
						break;
				}
				break;

			case "fighting":
				switch (stage) {
					case 0:
						cardSrc = Fighting0;
						break;
					case 1:
						cardSrc = Fighting1;
						break;
					case 2:
						cardSrc = Fighting2;
						break;
					default:
						cardSrc = Fighting0;
						break;
				}
				break;

			case "fire":
				switch (stage) {
					case 0:
						cardSrc = Fire0;
						break;
					case 1:
						cardSrc = Fire1;
						break;
					case 2:
						cardSrc = Fire2;
						break;
					default:
						cardSrc = Fire0;
						break;
				}
				break;

			case "grass":
				switch (stage) {
					case 0:
						cardSrc = Grass0;
						break;
					case 1:
						cardSrc = Grass1;
						break;
					case 2:
						cardSrc = Grass2;
						break;
					default:
						cardSrc = Grass0;
						break;
				}
				break;

			case "normal":
				switch (stage) {
					case 0:
						cardSrc = Normal0;
						break;
					case 1:
						cardSrc = Normal1;
						break;
					case 2:
						cardSrc = Normal2;
						break;
					default:
						cardSrc = Normal0;
						break;
				}
				break;

			case "psychic":
				switch (stage) {
					case 0:
						cardSrc = Psychic0;
						break;
					case 1:
						cardSrc = Psychic1;
						break;
					case 2:
						cardSrc = Psychic2;
						break;
					default:
						cardSrc = Psychic0;
						break;
				}
				break;

			case "water":
				switch (stage) {
					case 0:
						cardSrc = Water0;
						break;
					case 1:
						cardSrc = Water1;
						break;
					case 2:
						cardSrc = Water2;
						break;
					default:
						cardSrc = Water0;
						break;
				}
				break;
		
			default:
				switch (stage) {
					case 0:
						cardSrc = Normal0;
						break;
					case 1:
						cardSrc = Normal1;
						break;
					case 2:
						cardSrc = Normal2;
						break;
					default:
						cardSrc = Normal0;
						break;
				}
				break;
		}
		return cardSrc;
	}

	convertWeight = (hg) => {
		return useMetricSystem ? `${(hg*0.1).toFixed(1)} kg.` : `${(0.2204622622*hg).toFixed(1)} lbs.`;
	}

	convertHeight = (dm) => {
		let foot = (dm*0.3280839895).toFixed(2);
		let inches = ('0' + (Math.round((foot%1)*12))).slice(-2);
		return useMetricSystem ? `${(dm*0.1).toFixed(1)} m.` : `${Math.floor(foot)}'${inches}"`;
	}

	findStage = (evolvesFrom) => {
		if (evolvesFrom === null || (evolvesFrom && evolvesFrom["is_baby"])) {
			return 0;
		} else if (!evolvesFrom["evolves_from_species"]) {
			return 1;
		} else {
			return 2;
		}
	}

	// default normal and random cost
	generateMoveInfoElement = (move) => {
		let moveInfo = [];
		let cost = Math.floor(Math.random() * 4) + 1;
		let symbolSrc;
		if (move.type.name === this.props.pokemon.type.name) {
			switch (move.type.name) {
				case 'electric':
					symbolSrc = ElectricSymbol;
					break;

				case 'fighting':
					symbolSrc = FightingSymbol;
					break;

				case 'fire':
					symbolSrc = FireSymbol;
					break;

				case 'grass':
					symbolSrc = GrassSymbol;
					break;

				case 'psychic':
					symbolSrc = PsychicSymbol;
					break;

				case 'water':
					symbolSrc = WaterSymbol;
					break;
			
				default:
					symbolSrc = NormalSymbol;
					break;
			}
		} else {
			symbolSrc = NormalSymbol;
		}

		for (let i = 0; i < cost; i++) {
			moveInfo.push(symbolSrc)
		}

		return moveInfo.map((src, index) =>
			<img src={src} key={index} className="attack-style" alt="Element Symbol"></img>
		);
	}

	// reuse switch code
	generateResistanceElement = () => {
		let symbolSrc;
		const resistanceType = this.props.pokemon.type["damage_relations"]["half_damage_from"][0] ? this.props.pokemon.type["damage_relations"]["half_damage_from"][0].name : null;
		switch (resistanceType) {
			case 'electric':
				symbolSrc = ElectricSymbol;
				break;

			case 'fighting':
				symbolSrc = FightingSymbol;
				break;

			case 'fire':
				symbolSrc = FireSymbol;
				break;

			case 'grass':
				symbolSrc = GrassSymbol;
				break;

			case 'psychic':
				symbolSrc = PsychicSymbol;
				break;

			case 'water':
				symbolSrc = WaterSymbol;
				break;

			case 'normal':
				symbolSrc = NormalSymbol;
				break;
		
			default:
				symbolSrc = null;
				break;
		}

		if (symbolSrc) {
			return (
				<div id="pokemon-resistance-container">
					<img src={symbolSrc} className="dmg-modifier" alt="Element Symbol"></img>
					<div className="dmg-modifier-text">-20</div>
				</div>
			);
		}
	}

	// TODO: reuse switch code
	generateWeaknessElement = () => {
		let symbolSrc;
		const weaknessType = this.props.pokemon.type["damage_relations"]["double_damage_from"][0] ? this.props.pokemon.type["damage_relations"]["double_damage_from"][0].name : null;
		switch (weaknessType) {
			case 'electric':
				symbolSrc = ElectricSymbol;
				break;

			case 'fighting':
				symbolSrc = FightingSymbol;
				break;

			case 'fire':
				symbolSrc = FireSymbol;
				break;

			case 'grass':
				symbolSrc = GrassSymbol;
				break;

			case 'psychic':
				symbolSrc = PsychicSymbol;
				break;

			case 'water':
				symbolSrc = WaterSymbol;
				break;

			case 'normal':
				symbolSrc = NormalSymbol;
				break;
		
			default:
				symbolSrc = null;
				break;
		}

		if (symbolSrc) {
			return (
				<div id="pokemon-weakness-container">
					<img src={symbolSrc} className="dmg-modifier" alt="Element Symbol"></img>
					<div className="dmg-modifier-text">x2</div>
				</div>
			);
		}
	}

	// TODO: do this smarter wtf
	generateRetreatCostElement = () => {
		let list = [];
		let cost = Math.floor(Math.random() * 4) + 1;
		for (let i = 0; i < cost; i++) {
			list.push(i);
		}
		return (
			<div id="pokemon-retreat-container">
				{list.map((obj) => 
					<img src={NormalSymbol} key={obj} className="dmg-modifier" alt="Element Symbol"></img>
				)}
			</div>
		);
	}

	// TODO: split up into more components
	render() {
		//console.log("props", this.props.pokemon)
		const moveInfo = this.generateMoveInfoElement(this.props.pokemon.moves[0]);
		return (
			<div className="card-container">
				<img src={require('../assets/pokemon/sugimori/' + this.props.pokemon.id + '.png')} className="pokemon-img" alt="Pokemon" />
				{this.props.pokemon.species["evolves_from_species"] && !this.props.pokemon.species["evolves_from_species"]["is_baby"] ? <img src={require('../assets/pokemon/gifs/xyani/' + this.props.pokemon.species["evolves_from_species"].name + '.gif')} className="prev-pokemon-img" onClick={() => this.props.handlePrev(this.props.pokemon.species["evolves_from_species"].id, 0)} alt="Previous Pokemon" /> : null }
				<img src={this.selectCard(this.props.pokemon.type.name, this.findStage(this.props.pokemon.species["evolves_from_species"]))} className="card-img" alt="Pokecard" />
				<div className="pokemon-info">
					<p className="pokemon-header">
						<span id="pokemon-name">{this.props.pokemon.name.replace("-m", " ♂").replace("-f", "♀")}</span>
					</p>

					<p className="pokemon-hp-header">
						<span id="pokemon-hp-text">HP</span>
						<span id="pokemon-hp">{this.props.pokemon.stats[0]["base_stat"]}</span>
					</p>

					<p className="pokemon-middle">
						<span>{`NO. ${('00' + this.props.pokemon.id).slice(-3)}`}&nbsp;&nbsp;</span>
						<span>{this.props.pokemon.species.genera[7].genus}&nbsp;&nbsp;</span>
						<span>{`HT: ${this.convertHeight(this.props.pokemon.height)}`}&nbsp;&nbsp;</span>
						<span>{`WT: ${this.convertWeight(this.props.pokemon.weight)}`}</span>
					</p>

					<div id="pokemon-attack-container-1">
						<div className="attack-style-container">
							{moveInfo}
						</div>
						<div className="attack-text-container">
							<div className="attack-text">{this.props.pokemon.moves[0].name.replace("-", " ")}</div>
							<div className="attack-details">{this.props.pokemon.moves[0]["flavor_text_entries"][0].language.name === "en" ? this.props.pokemon.moves[0]["flavor_text_entries"][0]["flavor_text"] : null}</div>
						</div>
						{" "}
						<div className="attack-dmg">{this.props.pokemon.moves[0].power}</div>
					</div>

					{this.generateWeaknessElement()}
					{this.generateResistanceElement()}
					{this.generateRetreatCostElement()}

					<p className="pokemon-bottom">
						<span>{this.props.pokemon.species["flavor_text_entries"][1]["flavor_text"].replace("\n", " ").replace("\f", " ")}</span>
					</p>
				</div>
			</div>
		);
	}
}

export default Pokecard;