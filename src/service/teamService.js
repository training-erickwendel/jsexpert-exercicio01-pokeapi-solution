const TeamRepository = require('./../repository/teamRepository');

class TeamService {
  constructor({ teamRepository } = {}) {
    this.teamRepository = teamRepository || new TeamRepository();
  }

  getRandomItemFromArray(list) {
    const listLength = list.length;
    return list[Math.floor(Math.random() * listLength)];
  }

  getMultipleRandomItemsFromArray(list, quantity) {
    return Array(quantity)
      .fill(0)
      .map(() => this.getRandomItemFromArray(list));
  }

  async getTeam(teamSize = 3) {
    const pokemons = await this.teamRepository.listPokemons();
    const teamRaw = this.getMultipleRandomItemsFromArray(pokemons, teamSize);

    const team = await Promise.all(
      teamRaw.map(async pokemonRaw => {
        const { url } = pokemonRaw;
        const pokemon = await this.teamRepository.findPokemon(url);

        console.log({ pokemon });
      })
    );

    return team;
  }
}

module.exports = TeamService;
