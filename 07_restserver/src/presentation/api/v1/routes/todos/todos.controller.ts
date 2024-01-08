import { Request, Response } from 'express';
import { TodoRepository } from '../../../../../infrastructure';
import { CreateDto, CreateTodo, DeleteTodo, GetAllTodo, GetTodo, UpdateDto, UpdateTodo } from '../../../../../domain';

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

    public getTodos = (req: Request, res: Response) => {
        new GetAllTodo(this.repository).execute().then((todos) => {
            res.json({ todos });
        }).catch(error => res.json({ error }));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        new GetTodo(this.repository).execute(id).then((todo) => {
            res.json(todo);
        }).catch(error => res.status(404).json({ error }));
    }

    public addTodo = (req: Request, res: Response) => {
        const [error, todo] = CreateDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateTodo(this.repository).execute(todo!).then((resultTodo) => {
            res.json(resultTodo);
        })
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        const [error, todo] = UpdateDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });
        new UpdateTodo(this.repository).execute(todo!).then((resultTodo) => {
            res.json(resultTodo);
        }).catch(error => res.status(404).json({ error }));
    }


    public deleteTodo = (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        new DeleteTodo(this.repository).execute(id).then((todo) => {
            res.json(todo);
        }).catch(error => res.status(404).json({ error }));
    }
}