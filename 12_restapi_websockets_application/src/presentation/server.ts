import express, { Express, NextFunction, Request, Response, Router } from "express";

export class Server {
    constructor(
        private readonly port: number,
        private readonly service: Express,
        private readonly publicPath = "public"
    ) {
        this.config();
    }

    get getService() {
        return this.service;
    }

    private config() {
        this.service.use(express.json());
        this.service.use(express.urlencoded({ extended: true }));
        this.service.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

    }

    setRouter(router: Router | Router[]) {
        this.service.use("/api", router);
    }
}