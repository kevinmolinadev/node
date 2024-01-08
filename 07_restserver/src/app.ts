import express from "express";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRouter } from "./presentation/api";



(() => {
    main();
})();

function main() {
    const server = new Server({
        service: express(),
        routers: [
            AppRouter.v1.router(),
            AppRouter.v2.router(),
        ],
        port: envs.PORT
    });
    server.start();
}