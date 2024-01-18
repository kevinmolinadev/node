import { Router } from "express";
import { Controller } from "./category.controller";
import { CategoryService } from "../../../../services";
import { CategoryMongo } from "../../../../../infraestructure";
import { AuthMiddleware } from "../../../../middlewares";

export class Route {
    static get routes() {
        const category = Router();
        const datasource = new CategoryMongo();
        const service = new CategoryService(datasource);
        const controller = new Controller(service)

        category.get("/", controller.getAll);

        category.post("/", [AuthMiddleware.validateJwt], controller.add);

        return category;
    }
}