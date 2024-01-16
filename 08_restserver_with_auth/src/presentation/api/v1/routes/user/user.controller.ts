import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../../../../domain/dtos/user/create.dto";
import { HttpError } from "../../../../../domain";

export class Controller {
    constructor() { }

    getAll(req: Request, res: Response) {
        throw HttpError.internalServerError("Hello");
    }

    add(req: Request, res: Response, next: NextFunction) {
        const [error, newUser] = CreateUserDto.create(req.body);
        if (error) {
            next(error);
            return;
        };
        return res.json(newUser);
    }
}