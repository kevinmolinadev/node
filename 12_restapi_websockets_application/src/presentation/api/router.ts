import { Router } from "express";
import { Routes } from "./v1/routes";


export class AppRouter {
    static get v1() {
        const appRouter = Router();
        appRouter.use("/v1", Routes.routes)
        return appRouter;
    }
}