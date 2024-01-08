import { Router } from "express";
import { Controller } from "./todos.controller";
import { TodoDatasurce, TodoRepository } from "../../../../../infrastructure";

export class Todo {
    public static get routes(): Router {
        const todo = Router();
        const datasource = new TodoDatasurce();
        const repository = new TodoRepository(datasource);
        const controller = new Controller(repository);

        todo.get("/", controller.getTodos);
        todo.get("/:id", controller.getTodoById);

        todo.post("/", controller.addTodo);

        todo.put("/:id", controller.updateTodo);

        todo.delete("/:id", controller.deleteTodo);
        return todo;
    }
}