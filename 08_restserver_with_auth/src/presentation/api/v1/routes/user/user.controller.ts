import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../../../../domain/dtos/user/create.dto";
import { HttpError, UserEntity } from "../../../../../domain";
import { UserModel } from "../../../../../data";

export class Controller {
    constructor() { }

    async getAll(req: Request, res: Response) {
        const users = await UserModel.find({});
        res.json(users.map(UserEntity.fromObject));
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