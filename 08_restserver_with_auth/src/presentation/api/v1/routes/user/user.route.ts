import { Router } from "express"
import { Controller } from "./user.controller";

export class Route {
    static get routes() {
        const controller = new Controller()
        const user = Router();
        
        user.get("/",controller.getAll);
        user.post("/",controller.add)

        return user;
    }
}