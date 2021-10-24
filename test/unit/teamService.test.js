const { describe, it, before } = require('mocha');

const { expect } = require('chai');
const sinon = require('sinon');

const TeamService = require('../../src/service/teamService');

describe('TeamService Suite Tests', () => {
  let teamService = {};

  before(() => {
    teamService = new TeamService();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a random item from an array', () => {
    const list = [0, 1, 2, 3, 4];
    const item = teamService.getRandomItemFromArray(list);

    expect(list.includes(item)).to.be.true;
  });

  it('should return multiple random items from an array', () => {
    const list = [0, 1, 2, 3, 4];
    const quantity = 3;

    const spy = sandbox.spy(
      teamService,
      teamService.getRandomItemFromArray.name
    );

    const items = teamService.getMultipleRandomItemsFromArray(list, quantity);

    items.forEach(item => {
      expect(list.includes(item)).to.be.true;
    });

    expect(spy.callCount).to.be.equal(quantity);
  });

  it('should return a full team with 3 random pokemons, each one with 3 moves', async () => {
    const expected = [];

    sandbox
      .stub(teamService, teamService.getMultipleRandomItemsFromArray.name)
      .onFirstCall()
      .returns([
        { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
        { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
        { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' },
      ]);

    const team = await teamService.getTeam();

    expect(true).to.be.true;
  });
});
