import { HttpError } from "../../errors/http.error";

interface Options {
    page: number,
    limit: number,
}

export class PaginationDto {
    public readonly page: number;
    public readonly limit: number;

    constructor(options: Options) {
        this.page = options.page;
        this.limit = options.limit;
    }

    private static validation(property: any, propertyName: string): number | string {
        const number = Number(property);
        if (isNaN(number)) return `${propertyName} has to be a number.`;
        if (number <= 0) return `${propertyName} must be greater than 0.`;
        return number;

    }

    static create(object: { [key: string]: any }): [string?, PaginationDto?] {
        const { page = 1, limit = 10 } = object;

        if (typeof page === "number" && typeof limit === "number") return [, new PaginationDto({ page, limit })];

        const pageResult = this.validation(page, "Page");
        if (typeof pageResult === "string") return [pageResult];
        const limitResult = this.validation(limit, "Limit");
        if (typeof limitResult === "string") return [limitResult];

        return [, new PaginationDto({ page: pageResult, limit: limitResult })];
    }

}