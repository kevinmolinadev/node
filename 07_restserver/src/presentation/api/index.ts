import { Router } from "express";
import { routes as v1 } from "./v1";
import { routes as v2 } from "./v2";

export class AppRouter {
    public static get v1() {
        const app = Router();

        app.use("/v1", v1)

        return {
            router: () => {
                return app;
            }
        };
    }
    public static get v2() {
        const app = Router();

        app.use("/v2", v2)

        return {
            router: () => {
                return app;
            }
        };
    }
}