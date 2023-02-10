const { describe, it, before, beforeEach, after, afterEach } = require("mocha");
const { expect } = require("chai");
const http = require("http");
const request = require("supertest");
const sinon = require("sinon");
const Api = require("../../src/app");
const expectedTeam = require("../mocks/expectedTeam");

const SERVER_TEST_PORT = 4000;

describe("API SUIT TEST", () => {
  let app = {};
  let sandbox = sinon.createSandbox();
  const OLD_ENV = process.env;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    sandbox.restore();
    process.env = OLD_ENV;
  });

  describe("Object", () => {
    it("should start with server 3000", () => {
        const api = new Api();

        sandbox.spy(api);
        sandbox.stub(http, http.createServer.name).returns({ listen: (port, callback) => {} });
  
        api.createServer();

        expect(api.createServer.getCall(0).args[0]).to.be.equal(undefined);
      });

    it("should start the server on createServer method", () => {
      const api = new Api();

      sandbox.spy(api);
      sandbox.stub(http, http.createServer.name).returns({ listen: (port, callback) => {} });

      api.createServer(6789);

      expect(http.createServer.callCount).to.be.equal(1);
      expect(api.createServer.getCall(0).args[0]).to.be.equal(6789);
    });
  });

  describe("Routes", () => {
    before(() => {
      const instance = new Api();

      app = {
        instance,
        server: instance.createServer(SERVER_TEST_PORT),
      };
    });

    describe("/default", () => {
      it("should request the default and return HTTP status 200", async () => {
        await request(app.server).get("/default").expect(200);
      });
      it("should request the default and return content-type html", async () => {
        await request(app.server).get("/default").expect("Content-Type", /html/);
      });
      it("should request the default and return the default text", async () => {
        const expectedText =
          "Hey there, try /team so we can present to you your's 3 possibles choices";
        await request(app.server).get("/default").expect(expectedText).done;
      });
    });

    describe("/team", () => {
      it("should request the team and return 3 random pokemons ", async () => {
        
        const expectedResponse = {
          team: expectedTeam,
        };

        sandbox
          .stub(app.instance.pokemonService, app.instance.pokemonService.getRandomPokemonName.name)
          .returns('bulbasaur')
          .onSecondCall()
          .returns('charmander')
          .onThirdCall()
          .returns('squirtle');

        await request(app.server).get("/team").expect(expectedResponse);
      });
    });
  });
});