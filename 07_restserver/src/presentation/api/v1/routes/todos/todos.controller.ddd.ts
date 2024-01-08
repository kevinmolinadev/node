import { Request, Response } from 'express';
import { TodoRepository } from '../../../../../infrastructure';
import { CreateDto, UpdateDto } from '../../../../../domain';

export class Controller {
    constructor(
        private readonly repository: TodoRepository
    ) { }

    private verifyId = (id: string, res: Response): number | null => {
        const isNumber = Number(id);
        if (isNaN(isNumber)) {
            res.status(400).json({ error: `The id is not a number.` })
            return null;
        }
        return isNumber;
    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.repository.getAll();
        return res.json({ todos });
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        try {
            const todo = await this.repository.getById(id);
            return res.json(todo);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    public addTodo = async (req: Request, res: Response) => {
        const [error, todo] = CreateDto.create(req.body);
        if (error) return res.status(400).json({ error });
        const newTodo = await this.repository.create(todo!);
        return res.json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        const [error, todo] = UpdateDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });
        try {
            const todoUpdate = await this.repository.update(todo!);
            return res.json(todoUpdate);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        try {
            const todoDelete = await this.repository.delete(id);
            return res.json(todoDelete);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
}