import { Router } from "express";

export class Todo {
    static get routes(): Router {
        const app = Router();
        app.get("/", (req, res) => {
            const { name = "user" } = req.query
            res.json(`hello ${name} of version 2 api :D`);
        })
        return app;
    }
}