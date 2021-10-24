const TeamRepository = require('../../src/repository/teamRepository');
const sinon = require('sinon');

const urls = {
  base: 'https://pokeapi.co/api/v2/pokemon',
  pokemon1: 'https://pokeapi.co/api/v2/pokemon/6/',
  pokemon2: 'https://pokeapi.co/api/v2/pokemon/9/',
  pokemon3: 'https://pokeapi.co/api/v2/pokemon/11/',
};

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

stub.withArgs(urls.base).resolves(mocks.pokemons);
stub.withArgs(urls.pokemon1).resolves(mocks.pokemon1);
stub.withArgs(urls.pokemon2).resolves(mocks.pokemon2);
stub.withArgs(urls.pokemon3).resolves(mocks.pokemon3);

module.exports = {
  teamRepositoryMock,
  urls,
  mocks,
};
