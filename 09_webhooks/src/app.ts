import { envs } from "./config";
import { Server, AppRouter } from "./presentation";
import express from "express";

(() => {
    main();
})()

function main() {
    const server = new Server(
        express(),
        envs.PORT,
        AppRouter.routes
    )

    server.start();
}