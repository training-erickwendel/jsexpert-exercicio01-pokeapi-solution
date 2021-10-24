const https = require('https');

const API_BASE_URL = 'https://pokeapi.co/api/v2';

class TeamRepository {
  async makeRequest(url) {
    // return axios.get(url);
    const chunks = [];
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', data => {
          chunks.push(data);
        });
        response.on('error', reject);
        response.on('end', () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });
  }

  async listPokemons() {
    const data = await this.makeRequest(`${API_BASE_URL}/pokemon`);
    return data.results || [];
  }
}

module.exports = TeamRepository;
