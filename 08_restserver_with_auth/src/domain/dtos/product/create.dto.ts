import { HttpError } from "../../errors/http.error";

interface Options {
    name: string,
    price: number,
    user: string,
    category: string
}

export class CreateProductDto {
    public readonly name: string
    public readonly price: number
    public readonly user: string
    public readonly category: string

    private constructor(options: Options) {
        this.name = options.name;
        this.price = options.price;
        this.user = options.user;
        this.category = options.category;
    }

    private static basicValidation(property: any, propertyName: string): HttpError | null {
        if (property !== undefined && property.length === 0) return HttpError.badRequest(`${propertyName} can't be empty.`);
        if (!property) return HttpError.badRequest(`${propertyName} is required.`);
        return null;
    }

    static create(object: { [key: string]: any }): [HttpError | null, CreateProductDto | null] {
        const { name, price, user, category } = object;
        const validationResultName = this.basicValidation(name, "Name");
        if (validationResultName) return [validationResultName, null];
        const validationResultPrice = this.basicValidation(price, "Price");
        if (validationResultPrice) return [validationResultPrice, null];
        const priceAsNumber = Number(price);
        if (isNaN(priceAsNumber)) return [HttpError.badRequest("Price not a number."), null];
        const validationResultUser = this.basicValidation(user, "User");
        if (validationResultUser) return [validationResultUser, null];
        const validationResultCategory = this.basicValidation(category, "Category");
        if (validationResultCategory) return [validationResultCategory, null];
        return [null, new CreateProductDto({ name, price: priceAsNumber, user, category })];
    }
}