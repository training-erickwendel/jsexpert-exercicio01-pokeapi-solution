const http = require('http');
const TeamService = require('./service/teamService');

const routes = {
  '/team:get': async (request, response) => {
    const teamService = new TeamService();
    const team = await teamService.getTeam();

    response.write(JSON.stringify(team));

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
