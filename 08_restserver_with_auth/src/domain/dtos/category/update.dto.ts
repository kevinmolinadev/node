import { HttpError } from "../../errors/http.error";

interface Options {
    name: string,
    available: boolean,
    user: string
}

export class UpdateCategoryDto {
    public readonly name: string
    public readonly available: boolean
    public readonly user: string

    private constructor(options: Options) {
        this.name = options.name;
        this.available = options.available;
        this.user = options.user;
    }

    get values() {
        const obj: { [key: string]: any } = {}
        if (this.name) obj.name = this.name;
        if (this.available) obj.available = this.available;
        obj.user = this.user;
        return obj;
    }

    private static basicValidation(property: any, propertyName: string): HttpError | null {
        if (property !== undefined && property.length === 0) return HttpError.badRequest(`${propertyName} can't be empty.`);
        if (property !== undefined && !isNaN(+property)) return HttpError.badRequest(`${propertyName} not valid.`);
        return null;
    }

    static create(object: { [key: string]: any }): [HttpError | null, UpdateCategoryDto | null] {
        const { name, available, user } = object;
        if (user === undefined) return [HttpError.badRequest("User is required."), null];
        for (const value in object) {
            const validationResult = this.basicValidation(object[value], value.toUpperCase());
            if (validationResult) return [validationResult, null];
        }
        let asBoolean;
        if (available) {
            asBoolean = available === "true"
        }
        return [null, new UpdateCategoryDto({ name, available: asBoolean!, user })];
    }
}