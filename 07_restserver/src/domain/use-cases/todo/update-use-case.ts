import { TodoRepository } from "../../../infrastructure";
import { UpdateDto } from "../../dtos/todo/todo-update.dto";
import { TodoEntity } from "../../entities/todo.entity";

export class UpdateTodo {
    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute = (todo: UpdateDto): Promise<TodoEntity> => {
        return this.repository.update(todo);
    }

}