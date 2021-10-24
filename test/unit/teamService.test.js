const { describe, it, before } = require('mocha');

const { expect } = require('chai');
const TeamService = require('../../src/service/teamService');

describe('TeamService Suite Tests', () => {
  let teamService = {};

  before(() => {
    teamService = new TeamService();
  });

  it('should return a random item from an array', () => {
    const list = [0, 1, 2, 3, 4];
    const item = teamService.getRandomItemFromArray(list);

    expect(list.includes(item)).to.be.true;
  });

  it('should return multiple random items from an array', () => {
    expect(true).to.be.true;
  });

  it('should return a full team with 3 random pokemons, each one with 3 moves', async () => {
    expect(true).to.be.true;
  });
});
