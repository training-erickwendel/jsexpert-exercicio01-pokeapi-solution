const { describe, it } = require('mocha');
const request = require('supertest');
const { expect } = require('chai');
const api = require('../../src/api');

describe.skip('API Suite test', () => {
  describe('/team', () => {
    it('team page requests should return HTTP Status 200', async () => {
      const response = await request(api).get('/team');
      expect(response.statusCode).to.be.equal(200);
    });

    it('each team should have exactly 3 pokemons', async () => {
      const response = await request(api).get('/team').expect(200);
      expect(response.body.length).to.be.equal(3);
    });

    it('each pokemon inside a team should have exactly 3 moves', async () => {
      const response = await request(api).get('/team').expect(200);
      const team = response.body;

      team.forEach(pokemon => {
        expect(pokemon.moves.length).to.be.equal(3);
      });
    });
  });

  describe('/', () => {
    it('should redirect to / if tying call an inexisting route', async () => {
      const response = await request(api).get('/hi').expect(200);
      const expected = JSON.stringify({ success: true });

      expect(response.text).to.be.equal(expected);
    });
  });
});
