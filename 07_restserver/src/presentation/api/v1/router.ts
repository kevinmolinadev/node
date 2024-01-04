import { Router } from "express";
import { routes } from "./routes";

export class AppRouter {
    public static get router(): Router {
        const version = "/v1";
        const app = Router();

        app.use(version,routes)

        return app;
    }
}