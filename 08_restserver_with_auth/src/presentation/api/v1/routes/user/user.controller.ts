import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../../../../domain/dtos/user/create.dto";
import { UserService } from "../../../../services";

export class Controller {
    constructor(
        private readonly service: UserService
    ) { }

    getAll = (req: Request, res: Response) => {
        this.service.getAll()
            .then(result => res.json(result))
            .catch(e => { throw e });
    }

    add(req: Request, res: Response, next: NextFunction) {
        const [error, userDto] = CreateUserDto.create(req.body);
        if (error) return next(error);
        this.service.add(userDto!)
            .then(result => res.status(201).json(result))
            .catch(e => next(e));
        return res.json(userDto);
    }
}