const http = require('http');

const routes = {
  '/team:get': async (request, response) => {
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const pokemons = data.results;

      const myPokemons = await Promise.all(
        pokemons.splice(0, 3).map(async pokemon => {
          const {
            data: { moves, name },
          } = await axios.get(pokemon.url);
          return { moves: moves.map(move => move.move.name), name };
        })
      );

      response.write(JSON.stringify(myPokemons));
    } catch (e) {
      response.write(JSON.stringify(e));
    }

    return response.end();
  },
  default: (request, response) => {
    response.write(JSON.stringify({ success: true }));
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log('app running at', 3000));

module.exports = app;
