import { NextFunction, Request, Response } from "express";
import { ProductService } from "../../../../services";
import { CreateProductDto, HttpError, PaginationDto, UpdateProductDto } from "../../../../../domain";

export class Controller {
    constructor(
        private readonly service: ProductService
    ) { }

    getAll = (req: Request, res: Response, next: NextFunction) => {
        const [error, paginationDto] = PaginationDto.create(req.query);
        if (error) return next(HttpError.badRequest(error));
        this.service.getAll(paginationDto!)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        this.service.getById(req.params.id)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    add = (req: Request, res: Response, next: NextFunction) => {
        const [error, categoryDto] = CreateProductDto.create(req.body);
        if (error) return next(error);
        this.service.add(categoryDto!)
            .then(result => res.status(201).json(result))
            .catch(e => next(e));
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const [error, updateDto] = UpdateProductDto.create({ ...req.body, id: req.params.id });
        if (error) return next(error);
        this.service.update(updateDto!)
            .then(result => res.json(result))
            .catch(e => next(e));
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        this.service.delete(req.params.id)
            .then(result => res.json(result))
            .catch(e => next(e));
    }
}