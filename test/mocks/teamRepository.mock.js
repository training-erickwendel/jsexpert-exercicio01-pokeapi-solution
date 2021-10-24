const TeamRepository = require('../../src/repository/teamRepository');
const sinon = require('sinon');

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const BASE_POKEMON_1 = 'https://pokeapi.co/api/v2/pokemon/6/';
const BASE_POKEMON_2 = 'https://pokeapi.co/api/v2/pokemon/9/';
const BASE_POKEMON_3 = 'https://pokeapi.co/api/v2/pokemon/11/';

const mocks = {
  pokemons: require('./valid-pokemons.json'),
  pokemon1: require('./valid-pokemon-1.json'),
  pokemon2: require('./valid-pokemon-2.json'),
  pokemon3: require('./valid-pokemon-3.json'),
};

const teamRepositoryMock = new TeamRepository();

const stub = sinon.stub(
  teamRepositoryMock,
  teamRepositoryMock.makeRequest.name
);

stub.withArgs(BASE_URL).resolves(mocks.pokemons);
stub.withArgs(BASE_POKEMON_1).resolves(mocks.pokemon1);
stub.withArgs(BASE_POKEMON_2).resolves(mocks.pokemon2);
stub.withArgs(BASE_POKEMON_3).resolves(mocks.pokemon3);

module.exports = {
  teamRepositoryMock,
  BASE_URL,
  mocks,
};
