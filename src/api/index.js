const API_BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonApi {
  async get(url) {
    const json_response = await fetch(`${API_BASE_URL}/${url}`);
    const response = await json_response.json();

    return response;
  }
}

module.exports = PokemonApi;
