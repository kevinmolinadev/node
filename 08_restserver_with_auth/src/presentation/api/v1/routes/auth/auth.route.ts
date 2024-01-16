import { Router } from "express"
import { Controller } from "./auth.controller";
import { AuthService } from "../../../../services";
import { UserMongo } from "../../../../../infraestructure";

export class Route {
    static get routes() {
        const datasource = new UserMongo();
        const service = new AuthService(datasource);
        const controller = new Controller(service);
        const auth = Router();

        auth.get("/validate-email/:token", controller.validateEmail);

        auth.post("/login", controller.loginUser);
        auth.post("/register", controller.registerUser);

        return auth;
    }
}