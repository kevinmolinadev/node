import { Router } from "express"
import { Controller } from "./auth.controller";
import { AuthService, EmailService } from "../../../../services";
import { UserMongo } from "../../../../../infraestructure";
import { envs } from "../../../../../config";

export class Route {
    static get routes() {
        const datasource = new UserMongo();
        const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_KEY);
        const service = new AuthService(datasource, emailService, envs.SEND_EMAIL_VALIDATION);
        const controller = new Controller(service);
        const auth = Router();

        auth.get("/validate-email/:token", controller.validateEmail);

        auth.post("/login", controller.loginUser);
        auth.post("/register", controller.registerUser);

        return auth;
    }
}