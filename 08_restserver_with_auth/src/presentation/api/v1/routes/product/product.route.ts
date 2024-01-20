import { Router } from "express";
import { Controller } from "./product.controller";
import { AuthMiddleware, IdMiddleware } from "../../../../middlewares";
import { ProductMongo } from "../../../../../infraestructure";
import { ProductService } from "../../../../services";

export class Route {
    static get routes() {
        const product = Router();
        const datasource = new ProductMongo();
        const service = new ProductService(datasource);
        const controller = new Controller(service)

        product.get("/", controller.getAll);
        product.get("/:id", [IdMiddleware.validateId], controller.getById);

        product.post("/", [AuthMiddleware.validateJwt], controller.add);

        product.put("/:id", [AuthMiddleware.validateJwt, IdMiddleware.validateId], controller.update);

        product.delete("/:id", [AuthMiddleware.validateJwt, IdMiddleware.validateId], controller.delete);

        return product;
    }
}