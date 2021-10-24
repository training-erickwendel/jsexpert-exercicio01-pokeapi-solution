// const https = require('https');

const API_BASE_URL = 'https://pokeapi.co/api/v2';

class TeamRepository {
  async makeRequest(url) {
    // FIXME: unmock
    console.info({ url, API_BASE_URL });
    return {};
  }

  async listPokemons() {
    const data = await this.makeRequest(`${API_BASE_URL}/pokemon`);
    return data.results || [];
  }
}

module.exports = TeamRepository;
