import { yarg } from "./config/pugins/args.plugin";
import { ServerApp } from "./presentation/server_app";


(async () => {
    app();
})();

async function app() {
    const { b: base, l: limit, c: create, d: outputDir, n:name } = await yarg;
    ServerApp.run({ base, limit, create, outputDir, name});
}