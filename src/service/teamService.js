const TeamRepository = require('./../repository/teamRepository');

class TeamService {
  constructor({ teamRepository } = {}) {
    this.teamRepository = teamRepository || new TeamRepository();
  }

  getRandomItemFromArray(list) {
    // FIXME: unmock
    return list[0];
  }

  getMultipleRandomItemsFromArray(list, quantity) {
    // FIXME: unmock
    return list.splice(0, quantity);
  }

  async getTeam(teamSize = 3) {
    const pokemons = await this.teamRepository.listPokemons();
    const teamRaw = this.getMultipleRandomItemsFromArray(pokemons, teamSize);

    console.log({ teamRaw });

    // FIXME: unmock
    const team = [
      { name: 'x', moves: ['a', 'b', 'c'] },
      { name: 'y', moves: ['a', 'b', 'c'] },
      { name: 'z', moves: ['a', 'b', 'c'] },
    ];

    return team;
  }
}

module.exports = TeamService;
