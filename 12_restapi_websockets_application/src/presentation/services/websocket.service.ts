import { Server } from 'http';
import { WebSocket, WebSocketServer} from 'ws';

interface Options {
  server: Server;
  path?: string; 
}


export class WebSocketService {

  private static _instance: WebSocketService;
  private wss: WebSocketServer;

  private constructor( options: Options ) {
    const { server, path = '/ws' } = options;

    this.wss = new WebSocketServer({ server, path });
    this.start();
  }

  static get instance(): WebSocketService {
    if ( !WebSocketService._instance ) {
      throw 'WebSocketService is not initialized';
    }

    return WebSocketService._instance;
  }

  static initWebSocket( options: Options ) {
    WebSocketService._instance = new WebSocketService(options);
  }


  public sendMessage( type: string, payload: Object ) {
    this.wss.clients.forEach( client => {
      if ( client.readyState === WebSocket.OPEN ) {
        client.send( JSON.stringify({ type, payload }) );
      }
    })
  }


  public start() {

    this.wss.on('connection', (ws: WebSocket ) => {

      console.log('Client connected');

      ws.on('close', () => console.log('Client disconnected') )

    });
    
    this.wss.on("listening",()=>{
      console.log("websocket server running.")
    })
  }
}