import express, { Router, Express } from 'express';
import cors from "cors";
import { handleErrors } from './middlewares';

interface Options {
  port: number;
  routers: Router | Router[];
  service: Express;
}


export class Server {

  private readonly service: Express;
  private serverListener: any;
  private readonly port: number;
  private readonly routers: Router | Router[];

  constructor(options: Options) {
    const { port, routers, service } = options;
    this.port = port;
    this.routers = routers;
    this.service = service
  }

  public start() {
    //* Middlewares
    this.service.use(express.json()); // raw
    this.service.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    //* Routers
    this.service.use("/api", this.routers);

    //* Handle Erros
    this.service.use(handleErrors);

    this.serverListener = this.service.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }
  public close() {
    this.serverListener.close();
  }

}
