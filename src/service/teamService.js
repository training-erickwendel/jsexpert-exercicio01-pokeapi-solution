const TeamRepository = require('./../repository/teamRepository');

class TeamService {
  constructor({ teamRepository } = {}) {
    this.teamRepository = teamRepository || new TeamRepository();
  }

  async getTeam(teamSize = 3) {
    const team = [
      { name: 'x', moves: ['a', 'b', 'c'] },
      { name: 'y', moves: ['a', 'b', 'c'] },
      { name: 'z', moves: ['a', 'b', 'c'] },
    ];

    return team;
  }
}

module.exports = TeamService;
