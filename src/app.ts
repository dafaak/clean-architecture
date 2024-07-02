import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./data/mongodb";

(async () => {
  await main();
})()

async function main() {

  // await bdd
  await MongoDatabase.connect({
    mongoUrl: envs.mongoUrl,
    dbName: envs.dbName
  })

  // inicio del servidor
  const server = new Server({port: envs.port, routes: AppRoutes.routes});

  await server.start();
}