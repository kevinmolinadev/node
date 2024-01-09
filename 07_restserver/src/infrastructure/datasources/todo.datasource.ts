import { prisma } from "../../data/postgres";
import { CreateDto, ITodoDatasurce, ResponseError, TodoEntity, UpdateDto } from "../../domain";


export class TodoDatasurce implements ITodoDatasurce {

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }

    async getById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        })
        if (!todo) throw new ResponseError(`todo with id ${id} not found.`,404);
        return TodoEntity.fromObject(todo);
    }

    async create(todo: CreateDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: todo
        })
        return TodoEntity.fromObject(newTodo);
    }

    async update(todo: UpdateDto): Promise<TodoEntity> {
        await this.getById(todo.id);
        const updatedTodo = await prisma.todo.update({
            where: {
                id: todo.id
            },
            data: todo.values
        })
        return TodoEntity.fromObject(updatedTodo);
    }

    async delete(id: number): Promise<TodoEntity> {
        await this.getById(id);
        const deletedTodo = await prisma.todo.delete({
            where: {
                id
            }
        })
        return TodoEntity.fromObject(deletedTodo);
    }
}