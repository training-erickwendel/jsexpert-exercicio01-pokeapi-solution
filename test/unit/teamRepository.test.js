const TeamRepository = require('../../src/repository/teamRepository');

const { describe, it, before } = require('mocha');
const { expect } = require('chai');

const {
  teamRepositoryMock,
  urls,
  mocks,
} = require('../mocks/teamRepository.mock');

describe.only('TeamRepository Suite Tests', () => {
  let teamRepository = {};

  before(() => {
    teamRepository = teamRepositoryMock;
  });

  it('should call the specified url when makeRequest is called', async () => {
    const expected = mocks.pokemons;
    const result = await teamRepository.makeRequest(urls.base);

    expect(result).to.be.equal(expected);
  });

  it('should return a list of pokemons when listPokemons is called', async () => {
    const expected = mocks.pokemons.results;
    const result = await teamRepository.listPokemons();

    expect(result).to.be.equal(expected);
  });

  it('should return an specific pokemon when findPokemon is called', async () => {
    const expected = {
      name: mocks.pokemon1.name,
      moves: mocks.pokemon1.moves.map(move => move.move.name),
    };

    const result = await teamRepository.findPokemon(urls.pokemon1);

    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
  });
});
