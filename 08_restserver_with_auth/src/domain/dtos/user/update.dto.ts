import { Regex } from "../../../config";
import { HttpError } from "../../errors/http.error";

interface Options {
    id: string,
    name: string,
    last_name: string,
    email: string,
    password: string,
    img: string | null
}
export class UpdateUserDto {
    public readonly id: string;
    public readonly name: string;
    public readonly last_name: string;
    public readonly email: string;
    public readonly password: string;
    public readonly img: string | null;
    constructor(options: Options) {
        this.id = options.id;
        this.name = options.name;
        this.last_name = options.last_name;
        this.email = options.email;
        this.password = options.password;
        this.img = options.img || null
    }

    private static basicValidation(property: any, propertyName: string): [HttpError | null, UpdateUserDto | null] {
        if (property !== undefined && property.length === 0) return [HttpError.badRequest(`${propertyName} can't be empty.`), null];
        if (property !== undefined && !isNaN(+property)) return [HttpError.badRequest(`${propertyName} not valid.`), null];
        return [null, null];
    }

    public get getValues() {
        const obj: { [key: string]: any } = {};
        if (!this.name) obj.name = this.name;
        if (!this.last_name) obj.last_name = this.last_name;
        if (!this.email) obj.email = this.email;
        if (!this.password) obj.password = this.password;
        if (!this.img) obj.img = this.img;
        return obj;
    }

    static create(object: { [key: string]: any }): [HttpError | null, UpdateUserDto | null] {
        if (!object.id) return [HttpError.badRequest("Missing id."), null];
        for (const value in object) {
            const basicValidationResult = this.basicValidation(object[value], value);
            if (basicValidationResult[0] !== null) return basicValidationResult;
            if (value === "email" && !Regex.email.test(value)) return [HttpError.badRequest("Email not valid."), null];
            if (value === "password" && Regex.password.test(value)) return [HttpError.badRequest("Password can't be less than 6 digits long."), null];
        }
        return [null, new UpdateUserDto({ id: object.id, name: object.name, email: object.email, last_name: object.last_name, password: object.password, img: object.img })]
    }
}