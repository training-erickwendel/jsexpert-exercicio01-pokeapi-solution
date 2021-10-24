const TeamRepository = require('../../src/repository/teamRepository');
const sinon = require('sinon');

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const mocks = {
  pokemons: require('./valid-pokemons.json'),
};

const teamRepositoryMock = new TeamRepository();

const stub = sinon.stub(
  teamRepositoryMock,
  teamRepositoryMock.makeRequest.name
);

stub.withArgs(BASE_URL).resolves(mocks.pokemons);

module.exports = {
  teamRepositoryMock,
  BASE_URL,
  mocks,
};
