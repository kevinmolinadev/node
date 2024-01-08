import { TodoRepository } from "../../../infrastructure";
import { CreateDto } from "../../dtos/todo/todo-create.dto";
import { TodoEntity } from "../../entities/todo.entity";

export class CreateTodo {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute = (todo: CreateDto): Promise<TodoEntity> => {
        return this.repository.create(todo);
    }

}