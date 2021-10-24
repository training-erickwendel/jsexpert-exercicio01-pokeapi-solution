const { describe, it } = require('mocha');
const request = require('supertest');
const { expect } = require('chai');
const api = require('../../src/api');

describe.skip('API Suite test', () => {
  describe('/team', () => {
    it('should return HTTP status 200 when /team is called', async () => {
      const response = await request(api).get('/team');
      expect(response.statusCode).to.be.equal(200);
    });

    it('should return exactly 3 pokemons in the team', async () => {
      const response = await request(api).get('/team').expect(200);
      expect(response.body.length).to.be.equal(3);
    });

    it('should return 3 moves for each pokemon in the team', async () => {
      const response = await request(api).get('/team').expect(200);
      const team = response.body;

      team.forEach(pokemon => {
        expect(pokemon.moves.length).to.be.equal(3);
      });
    });
  });

  describe('/', () => {
    it('should redirect to / if trying call an inexisting route', async () => {
      const response = await request(api).get('/hi').expect(200);
      const expected = JSON.stringify({ success: true });

      expect(response.text).to.be.equal(expected);
    });
  });
});
