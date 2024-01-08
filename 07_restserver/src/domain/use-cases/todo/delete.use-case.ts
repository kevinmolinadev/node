import { TodoRepository } from "../../../infrastructure";
import { TodoEntity } from "../../entities/todo.entity";

export class DeleteTodo {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute = (id: number): Promise<TodoEntity> => {
        return this.repository.delete(id);
    }

}