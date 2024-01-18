import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../../services";
import { CreateUserDto, LoginUserDto } from "../../../../../domain";

export class Controller {
    constructor(
        private readonly service: AuthService
    ) { }

    validateEmail = (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params
        this.service.validateEmail(token)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    loginUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return next(error);
        this.service.loginUser(loginUserDto!)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const [error, userDto] = CreateUserDto.create(req.body);
        if (error) return next(error);
        this.service.registerUser(userDto!)
            .then(result => res.status(201).json(result))
            .catch(e => next(e));
    }
};
