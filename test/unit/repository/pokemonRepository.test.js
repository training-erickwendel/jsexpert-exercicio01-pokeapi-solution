
const sinon = require("sinon");
const { expect } = require("chai");
const { describe, it, before, beforeEach, afterEach } = require("mocha");
const PokemonRepository = require("../../../src/repository/pokemonRepository.js");
const PokemonApi = require('../../../src/api');


const mocks = {
  firstPage: require("../../mocks/firstPage.json"),
  squirtle: require("../../mocks/pokemon.json")
};

const fetchStub = sinon.stub(PokemonApi.prototype, "get");

fetchStub.withArgs('pokemon').resolves(mocks.firstPage);
fetchStub.withArgs('pokemon/squirtle').resolves(mocks.squirtle);

describe("#PokemonRepository", () => {
  let pokemonRepository;
  let sandbox;

  before(() => {
    pokemonRepository = new PokemonRepository();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(".getAllPokemons", () => {
    it('should return the first pokemon page', async () => {
      const result = await pokemonRepository.getAllPokemons();

      const expected = mocks.firstPage.results;

      expect(result).to.eql(expected)
    })
  });

  describe(".getPokemon", () => {
    it('should return the expected pokemon', async () => {

      const result = await pokemonRepository.getPokemon('squirtle');

      const { name, moves } = mocks.squirtle;

      const expected = {
        name,
        moves: moves.slice(0, 3).map(move => move.move.name),
      }

      expect(result).to.eql(expected)
      expect(result.moves.length).to.eql(3)
      expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
    })
  })
});
