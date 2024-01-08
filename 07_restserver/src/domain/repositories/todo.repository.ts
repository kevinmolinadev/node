import { CreateDto } from "../dtos/todo/todo-create.dto";
import { UpdateDto } from "../dtos/todo/todo-update.dto";
import { TodoEntity } from "../entities/todo.entity";

export interface ITodoRepository {
    getAll(): Promise<TodoEntity[]>,
    getById(id: number): Promise<TodoEntity>,
    create(todo: CreateDto): Promise<TodoEntity>,
    update(todo: UpdateDto): Promise<TodoEntity>,
    delete(id: number): Promise<TodoEntity>
}