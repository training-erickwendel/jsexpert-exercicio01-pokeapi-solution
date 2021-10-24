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
