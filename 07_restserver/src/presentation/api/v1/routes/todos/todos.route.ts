import { Router } from "express";
import { Controller } from "./todos.controller";

export class Todo {
    public static get routes(): Router {
        const todo = Router();
        const controller = new Controller();

        todo.get("/", controller.getTodos);
        todo.get("/:id", controller.getTodoById);

        todo.post("/", controller.addTodo);

        todo.put("/:id", controller.updateTodo);

        todo.delete("/:id", controller.deleteTodo);
        return todo;
    }
}