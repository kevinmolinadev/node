import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../../services";
import { CreateUserDto } from "../../../../../domain";

export class Controller {
    constructor(
        private readonly service: AuthService
    ) { }

    validateEmail(req: Request, res: Response) {
        const { token } = req.params
        res.json({ token })

    }

    loginUser(req: Request, res: Response) {
        res.json("login user")

    }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const [error, userDto] = CreateUserDto.create(req.body);
        if (error) {
            next(error);
            return;
        }
        try {
            const user = await this.service.registerUser(userDto!);
            res.json(user);
        } catch (error) {
            next(error);
        }
    };
}