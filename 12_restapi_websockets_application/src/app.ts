import { createServer } from "http";
import { Envs } from "./config/envs";
import express from "express";
import { AppRouter, Server, WebSocketService } from "./presentation";

(() => {
    main();
})();

function main() {
    const server = new Server(
        Envs.PORT,
        express(),
    )

    const httpServer = createServer(server.getService);
    WebSocketService.initWebSocket({
        server: httpServer
    })

    server.setRouter([AppRouter.v1]);

    httpServer.listen( Envs.PORT, () => {
        console.log(`Server running on port: ${ Envs.PORT }`);
      })
}