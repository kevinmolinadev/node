import express from 'express';
import { envs } from './config';
import { AppRouter, Server } from './presentation';
import { MongoDatabase, UserModel } from './data';


(async () => {
  main();
})();


async function main() {
  await new MongoDatabase(
    envs.MONGO_URL,
    envs.MONGO_DB
  ).start()
  new Server({
    port: envs.PORT,
    routers: AppRouter.v1,
    service: express()
  }).start();
}