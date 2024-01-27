import { Router } from "express";
import { TicketRouter } from "./ticket/router";

export class Routes {
    static get routes() {
        const router = Router()
        
        router.use("/tickets", TicketRouter.routes);

        return router;
    }
}