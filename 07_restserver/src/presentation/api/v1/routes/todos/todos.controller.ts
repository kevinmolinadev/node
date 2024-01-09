import { Request, Response } from 'express';
import { TodoRepository } from '../../../../../infrastructure';
import { CreateDto, CreateTodo, DeleteTodo, GetAllTodo, GetTodo, ResponseError, UpdateDto, UpdateTodo } from '../../../../../domain';

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

    private handleError = (res: Response, error: unknown) => {
        if (error instanceof (ResponseError)) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Internal server error." });
        return;
    }

    public getTodos = (req: Request, res: Response) => {
        new GetAllTodo(this.repository).execute().then((todos) => {
            res.json({ todos });
        }).catch(error => this.handleError(res, error));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        new GetTodo(this.repository).execute(id).then((todo) => {
            res.json(todo);
        }).catch(error => this.handleError(res, error));
    }

    public addTodo = (req: Request, res: Response) => {
        const [error, todo] = CreateDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateTodo(this.repository).execute(todo!).then((resultTodo) => {
            res.status(201).json(resultTodo);
        }).catch(error => this.handleError(res, error));
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        const [error, todo] = UpdateDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });
        new UpdateTodo(this.repository).execute(todo!).then((resultTodo) => {
            res.json(resultTodo);
        }).catch(error => this.handleError(res, error));
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = this.verifyId(req.params.id, res);
        if (!id) return;
        new DeleteTodo(this.repository).execute(id).then((todo) => {
            res.json(todo);
        }).catch(error => this.handleError(res, error));
    }
}