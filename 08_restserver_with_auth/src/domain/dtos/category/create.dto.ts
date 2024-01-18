import { HttpError } from "../../errors/http.error";

interface Options {
    name: string,
    user: string
}

export class CreateCategoryDto {
    public readonly name: string
    public readonly user: string

    private constructor(options: Options) {
        this.name = options.name;
        this.user = options.user;
    }

    private static basicValidation(property: any, propertyName: string): HttpError | null {
        if (property !== undefined && property.length === 0) return HttpError.badRequest(`${propertyName} can't be empty.`);
        if (property !== undefined && !isNaN(+property)) return HttpError.badRequest(`${propertyName} not valid.`);
        if (!property) return HttpError.badRequest(`${propertyName} is required.`);
        return null;
    }

    static create(object: { [key: string]: any }): [HttpError | null, CreateCategoryDto | null] {
        const { name, user } = object;
        const validationResultName = this.basicValidation(name, "Name");
        if (validationResultName) return [validationResultName, null];
        const validationResultUser = this.basicValidation(user, "User");
        if (validationResultUser) return [validationResultUser, null];
        return [null, new CreateCategoryDto({ name, user })];
    }
}