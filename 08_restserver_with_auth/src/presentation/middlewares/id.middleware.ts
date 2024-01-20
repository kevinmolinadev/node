import { NextFunction, Request, Response } from "express";

export class IdMiddleware {

    static validateId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if (id.length < 24) return res.status(400).json({ error: "Invalid id." });
        next();
    }
}