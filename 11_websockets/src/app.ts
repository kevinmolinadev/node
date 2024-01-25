import { envs } from "./config";
import { Server } from "./presentation";

(() => {
    main();
})()

function main() {
    const server = new Server(
        envs.PORT
    );
    server.start();
}