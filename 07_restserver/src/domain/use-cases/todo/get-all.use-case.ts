import { TodoRepository } from "../../../infrastructure";
import { TodoEntity } from "../../entities/todo.entity";

export class GetAllTodo {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute = (): Promise<TodoEntity[]> => {
        return this.repository.getAll();
    }

}