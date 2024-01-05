import { Request, Response } from 'express';
import { todos } from '../../../../data/todo';
import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();
export class Controller {
    constructor() { }

    private verifyID = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ message: `the id should be a number` });
        return id;
    }


    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await prisma.todo.findMany();
            return res.json({ todos });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error!"});
        } finally {
            prisma.$disconnect();
        }
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = this.verifyID(req, res);
        const todo = await prisma.todo.findUnique({
            where: {
                id: id as number
            }
        });
        if (!todo) return res.status(404).json({ message: `todo with id ${id} not found` });
        return res.json(todo);
    }

    public addTodo = async (req: Request, res: Response) => {
        const { title } = req.body;
        if (title === undefined) return res.status(400).json({ message: "Property is required" });
        try {
            const newTodo = await prisma.todo.create({
                data: {
                    title: title,
                }
            })
            return res.json(newTodo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error!"});
        } finally {
            prisma.$disconnect();
        }
    }

    private verifyStatus = (status: string): Status | null => {
        const todoStatus: { [key: string]: Status } = {
            "active": Status.ACTIVE,
            "completed": Status.COMPLETED
        }
        if (todoStatus[status] === undefined) return null;
        return todoStatus[status];
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = this.verifyID(req, res);
        const todoExists = await prisma.todo.findUnique({
            where: {
                id: id as number
            }
        })
        if (!todoExists) return res.status(404).json({ message: `todo with id ${id} not found` });
        const { title, status: statusReq, done: doneReq, completedAt } = req.body;
        const status = this.verifyStatus(statusReq);
        const done = doneReq === "true";
        if (!status) return res.status(40).json({ message: `this status "${status}" is not defined` });
        try {
            await prisma.todo.update({
                where: {
                    id: id as number
                },
                data: {
                    title,
                    status,
                    done,
                    completedAt: new Date(completedAt)
                }
            });
            return res.json({ message: `todo with id ${id} updated!` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error!"});
        } finally {
            prisma.$disconnect();
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = this.verifyID(req, res);
        const todoExists = await prisma.todo.findUnique({
            where: {
                id: id as number
            }
        })
        if (!todoExists) return res.status(404).json({ message: `todo with id ${id} not found` });
        try {
            await prisma.todo.delete({
                where: {
                    id: id as number
                }
            });
            return res.json({ message: `todo with id ${id} eliminated` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error!"});
        } finally {
            prisma.$disconnect();
        }

    }
}