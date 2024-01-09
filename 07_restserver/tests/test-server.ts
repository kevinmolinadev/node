import express from "express";
import { Server } from "../src/presentation/server";
import { AppRouter } from "../src/presentation/api";
import { envs } from "../src/config/envs";

export const testServer = new Server({
    service: express(),
    routers: [
        AppRouter.v1.router(),
        AppRouter.v2.router()
    ],
    port: envs.PORT
})