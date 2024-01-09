import express, { Router, Express } from "express";

interface ServerOptions {
    service: Express
    routers: Router[]
    port: number
}

export class Server {
    private readonly service: Express;
    private readonly routers: Router[];
    private listener: any;
    private readonly port: number;

    constructor(options: ServerOptions) {
        const { service, routers, port } = options;
        this.service = service;
        this.routers = routers;
        this.port = port;
    }

    public get getService() {
        return this.service;
    }

    public start() {
        //* Middlewares
        this.service.use(express.json()); // raw
        this.service.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        //* 
        this.service.use("/api", this.routers);

        this.listener = this.service.listen(this.port, () => console.log(`server is running: https://localhost:${this.port}`));
    }

    public close() {
        this.listener.close();
    }
}