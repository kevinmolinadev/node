import { envs } from "../config/plugins/envs.plugin";
import { Server } from "./presentation/server";

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH
    });
    server.start();
}