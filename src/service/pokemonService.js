class PokemonService {
  constructor({ repository }) {
    this.repository = repository;
  }

  getRandomPokemonName(pokemons) {
    const random_pokemon_index = Math.floor(Math.random() * pokemons.length);
    return pokemons[random_pokemon_index].name;
  }

  async getTeam() {
    const pokemons = await this.repository.getAllPokemons();
    const team = await Promise.all(
      Array.from({ length: 3 }).map(async () => {
      const name = this.getRandomPokemonName(pokemons)
      return this.repository.getPokemon(name);
      })
    );

    return team;
  }
}

module.exports = PokemonService;
