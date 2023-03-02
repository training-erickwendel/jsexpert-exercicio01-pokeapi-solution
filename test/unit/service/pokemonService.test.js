const sinon = require("sinon");
const { expect } = require("chai");
const { describe, it, before, beforeEach, afterEach } = require("mocha");
const PokemonService = require("../../../src/service/pokemonService.js");

const firstPage = require("../../mocks/firstPage.json");

const repository = {
  getAllPokemons: () => { },
  getPokemon: () => { }
}

const getAllPokemonsMock = sinon.stub(repository, 'getAllPokemons');
getAllPokemonsMock.resolves(firstPage.results);

const getPokemonMock = sinon.stub(repository, 'getPokemon');
getPokemonMock.resolvesArg(0);

describe("#PokemonService", () => {
  let pokemonService;
  let sandbox;

  before(() => {
    pokemonService = new PokemonService({ repository });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(".getRandomPokemonName", () => {
    it('should return a random pokemon name', async () => {
      const pokemons = [
        {
          name: 'mewtwo',
        },
        {
          name: 'mew',
        },
        {
          name: 'cindaquil'
        }
      ]
      sinon.stub(Math, Math.random.name).returns(0);

      const result = await pokemonService.getRandomPokemonName(pokemons);
      const expected = pokemons.map(pokemon => pokemon.name)

      expect(expected).to.contain(result)
      expect(result).to.eql(pokemons[0].name)
    })
  });

  describe(".getTeam", () => {
    it('should return a random pokemon', async () => {
      const getRandomPokemonNameMock = sinon.stub(pokemonService, 'getRandomPokemonName');
      getRandomPokemonNameMock.resolves("articuno");

      const result = await pokemonService.getTeam();
      const expected = Array.from({ length: 3 }).map(() => 'articuno');

      expect(expected).to.eql(result)
      expect(repository.getAllPokemons.called).to.be.true
      expect(repository.getPokemon.called).to.be.true
      expect(repository.getPokemon.callCount).to.eql(3)
    })
  });
});

