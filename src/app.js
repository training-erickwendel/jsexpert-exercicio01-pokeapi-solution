const http = require("http");
const PokemonRepository = require("./repository/pokemonRepository");
const PokemonService = require("./service/pokemonService");

const DEFAULT_PORT = 3000;
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const createPokemonService = () => {
  const pokemonRepository = new PokemonRepository()
  return { PokemonService: new PokemonService({ repository: pokemonRepository }) }
}

class App {
  constructor(dependencies = createPokemonService()) {
    this.pokemonService = dependencies.PokemonService;
  }

  createRoutes() {
    return {
      default: (request, response) => {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write("Hey there, try /team so we can present to you your's 3 possibles choices");
        return response.end();
      },
      "/team:get": async (request, response) => {
        const team = await this.pokemonService.getTeam();
        response.write(JSON.stringify({ team }));
        return response.end();
      },
    };
  }

  handler(request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;

    const routes = this.createRoutes();
    const chosen = routes[routeKey] || routes.default;

    response.writeHeader(200, DEFAULT_HEADERS);

    return chosen(request, response);
  }

  createServer(port = DEFAULT_PORT) {
    const app = http
      .createServer(this.handler.bind(this))
      .listen(port, () => console.log(`Listening on ${port}`));

    return app;
  }
}

module.exports = App;
