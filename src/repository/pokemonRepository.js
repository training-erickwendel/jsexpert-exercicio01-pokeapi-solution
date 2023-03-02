const PokemonApi = require('../api');

class PokemonRepository {
  constructor() {
    this.api = new PokemonApi();
  }

  async getAllPokemons() {
    const pokemons = await this.api.get('pokemon');
    return pokemons.results
  }

  async getPokemon(pokemon) {
    const { name, moves } = await this.api.get(`pokemon/${pokemon}`);

    return {
      name,
      moves: moves.slice(0, 3).map(move => move.move.name),
    };
  }
}

module.exports = PokemonRepository;
