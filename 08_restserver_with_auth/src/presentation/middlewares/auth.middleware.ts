import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../domain";
import { Jwt } from "../../config";

export class AuthMiddleware {


    static async validateJwt(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization
        if (!authorization) return next(HttpError.badRequest("token not provided."));
        if (!authorization.startsWith("Bearer ")) return next(HttpError.badRequest("Invalid bearer token."));
        const token = authorization.split(" ")[1];
        try {
            const payload = await Jwt.verify<{ id: string }>(token);
            req.body.user = payload.id;
            console.log(req.body);
            next();
        } catch (error) {
            next(error);
        }

    }
}