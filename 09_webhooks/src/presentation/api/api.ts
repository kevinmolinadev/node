import { Router } from "express";
import { Route as Github } from "./github/router";

export class AppRouter {

    static get routes() {
        const router = Router();

        router.use("/github", Github.routes);

        return router;
    }
}