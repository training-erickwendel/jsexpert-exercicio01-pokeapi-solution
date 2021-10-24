const TeamRepository = require('../../src/repository/teamRepository');

const { describe, it, before } = require('mocha');
const { expect } = require('chai');

const {
  teamRepositoryMock,
  BASE_URL,
  mocks,
} = require('../mocks/teamRepository.mock');

describe('TeamRepository Suite Tests', () => {
  let teamRepository = {};

  before(() => {
    teamRepository = teamRepositoryMock;
  });

  it('should call the specified url when makeRequest is called', async () => {
    const expected = mocks.pokemons;
    const result = await teamRepository.makeRequest(BASE_URL);

    expect(result).to.be.equal(expected);
  });

  it('should return a list of pokemons when listPokemons is called', async () => {
    const expected = mocks.pokemons.results;
    const result = await teamRepository.listPokemons();

    expect(result).to.be.equal(expected);
  });

  // TODO: implement findPokemon test
});
