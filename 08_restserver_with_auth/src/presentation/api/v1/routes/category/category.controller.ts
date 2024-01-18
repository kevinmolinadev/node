import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../../../../services";
import { CreateCategoryDto, HttpError, PaginationDto } from "../../../../../domain";

export class Controller {
    constructor(
        private readonly service: CategoryService
    ) { }

    getAll = (req: Request, res: Response, next: NextFunction) => {
        const [error, paginationDto] = PaginationDto.create(req.query);
        if (error) return next(HttpError.badRequest(error));
        this.service.getAll(paginationDto!)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    add = (req: Request, res: Response, next: NextFunction) => {
        const [error, categoryDto] = CreateCategoryDto.create(req.body);
        if (error) return next(error);
        this.service.add(categoryDto!)
            .then(result => res.status(201).json(result))
            .catch(e => next(e));
    }
}