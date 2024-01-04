import { Request, Response } from 'express';
import { todos } from '../../../../data/todo';
export class Controller {
    constructor() { }

    private verifyID = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ message: `the id should be a number` });
        return id;
    }


    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = this.verifyID(req, res);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });
        return res.json(todo);
    }

    public addTodo = (req: Request, res: Response) => {
        const { title, description, createdAt } = req.body;
        if (title === undefined || description === undefined || createdAt === undefined) return res.status(400).json({ message: "Property is required" });
        const newTodo = {
            id: todos.length + 1,
            title,
            description,
            createdAt: new Date(createdAt) || new Date()
        }
        todos.push(newTodo);
        return res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = this.verifyID(req, res);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });
        const { title, description } = req.body;
        const update = { ...todo, title, description };
        todos.splice(todos.indexOf(todo), 1, update);
        return res.json(update);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = this.verifyID(req, res);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });
        todos.splice(todos.indexOf(todo), 1);
        return res.json({ message: `todo with id ${id} eliminated` });

    }
}