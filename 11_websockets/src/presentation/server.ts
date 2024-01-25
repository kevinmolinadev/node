import { WebSocket, WebSocketServer } from 'ws';

export class Server {
    constructor(
        private readonly port: number,
    ) { }

    start() {
        const wss = new WebSocketServer({ port: this.port });
        wss.on('connection', function connection(ws) {
            ws.on('error', console.error);
            ws.on('message', function message(data, isBinary) {
                console.log('received: %s', data);
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(data, { binary: isBinary });
                    }
                });
            });
            console.log("Client connected");
            ws.send('something');

            ws.on("close", () => {
                console.log("Client disconnected");
            })
        });
        wss.on("listening", () => {
            console.log(`server listening on port ${this.port}`)
        })
    }
}