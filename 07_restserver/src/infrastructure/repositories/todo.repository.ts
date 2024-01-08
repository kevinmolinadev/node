import { CreateDto, ITodoRepository, TodoEntity, UpdateDto } from "../../domain";
import { TodoDatasurce } from "../datasources/todo.datasource";

export class TodoRepository implements ITodoRepository {
    constructor(
        private readonly datasource: TodoDatasurce,
    ) { }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    getById(id: number): Promise<TodoEntity> {
        return this.datasource.getById(id);
    }
    create(todo: CreateDto): Promise<TodoEntity> {
        return this.datasource.create(todo);
    }
    update(todo: UpdateDto): Promise<TodoEntity> {
        return this.datasource.update(todo);
    }
    delete(id: number): Promise<TodoEntity> {
        return this.datasource.delete(id);
    }
}