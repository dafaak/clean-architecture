import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";

(async () => {
  await main();
})()

async function main() {
  // todo: await bdd
  require('dotenv').config();
  console.log('main');

  // inicio del servidor
  const server = new Server({port: envs().port, routes: AppRoutes.routes});

  await server.start();
}