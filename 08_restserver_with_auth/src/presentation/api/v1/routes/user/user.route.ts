import { Router } from "express"
import { Controller } from "./user.controller";
import { UserService } from "../../../../services";
import { UserMongo } from "../../../../../infraestructure";

export class Route {
    static get routes() {
        const datasource = new UserMongo();
        const service = new UserService(datasource);
        const controller = new Controller(service);
        const user = Router();

        user.get("/", controller.getAll);
        user.post("/", controller.add)
        
        return user;
    }
}