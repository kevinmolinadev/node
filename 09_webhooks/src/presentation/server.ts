import express, { Express, Router } from "express"

export class Server {

    constructor(
        private readonly service: Express,
        private readonly port: number,
        private readonly router: Router
    ) { }

    start() {
        this.service.use(express.json());

        this.service.use("/api", this.router);

        this.service.listen(this.port, () => {
            console.log(`server running http://localhost:${this.port}`);
        })
    }
}