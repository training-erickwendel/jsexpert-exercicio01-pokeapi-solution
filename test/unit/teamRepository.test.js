const TeamRepository = require('../../src/repository/teamRepository');

const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const mocks = {
  pokemons: require('./../mocks/valid-pokemons.json'),
};

describe('TeamRepository Suite Tests', () => {
  let teamRepository = {};

  before(() => {
    const repository = new TeamRepository();

    const stub = sinon.stub(repository, repository.makeRequest.name);

    stub.withArgs(BASE_URL).resolves(mocks.pokemons);

    teamRepository = repository;
  });

  it('should call the specified url when makeRequest is called', async () => {
    const expected = {};
    const result = await teamRepository.makeRequest(BASE_URL);

    expect(result).to.be.equal(expected);
  });

  it('should return a list of pokemons when listPokemons is called', async () => {
    const expected = {};
    const result = await teamRepository.listPokemons();

    expect(result).to.be.equal(expected);
  });
});
