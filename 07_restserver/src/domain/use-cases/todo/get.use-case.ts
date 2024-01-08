import { TodoRepository } from "../../../infrastructure";
import { TodoEntity } from "../../entities/todo.entity";

export class GetTodo {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute = (id: number): Promise<TodoEntity> => {
        return this.repository.getById(id);
    }

}