import express from "express";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRouter } from "./presentation/api/v1/router";



(() => {
    main();
})();

function main() {
    const server = new Server({
        service: express(),
        routers: [AppRouter.router],
        port: envs.PORT
    });
    server.start();
}