import express from "express";

interface ServerOptions {
    port: number,
    publicPath: string
}
export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly publicPath: string;
    constructor(options: ServerOptions) {
        const { port, publicPath } = options;
        this.port = port;
        this.publicPath = publicPath;
    }

    public start() {
        this.app.use(express.static(this.publicPath));

        this.app.listen(this.port, () => {
            console.log("server running is port ", this.port);
        });
    }
}