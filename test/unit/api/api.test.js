const sinon = require("sinon");
const { expect } = require("chai");
const { describe, it, before, beforeEach, afterEach } = require("mocha");
const PokemonApi = require('../../../src/api');


const fetchStub = sinon.stub(global, "fetch");
fetchStub.resolves({
  json: () => Promise.resolve("vulpix")
})

describe("#PokemonApi", () => {
  let pokemonApi;
  let sandbox;

  before(() => {
    pokemonApi = new PokemonApi();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(".get", () => {
    it('should fetch the pokemon page', async () => {
      const result = await pokemonApi.get('pokemon');
      const expected = 'https://pokeapi.co/api/v2/pokemon';

      expect(fetchStub.args[0][0]).to.eql(expected)
      expect(result).to.eql('vulpix');
    })
  });
});
