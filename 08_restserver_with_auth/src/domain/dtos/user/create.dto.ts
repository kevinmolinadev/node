import { Regex } from "../../../config";
import { HttpError } from "../../errors/http.error";

interface Options {
    name: string,
    last_name: string,
    email: string,
    password: string,
}

export class CreateUserDto {
    public readonly name: string;
    public readonly last_name: string;
    public readonly email: string;
    public readonly password: string;
    public constructor(options: Options) {
        this.name = options.name;
        this.last_name = options.last_name;
        this.email =options.email;
        this.password = options.password;
    }

    private static basicValidation(property: any, propertyName: string): [HttpError | null, CreateUserDto | null] {
        if (property !== undefined && property.length === 0) return [HttpError.badRequest(`${propertyName} can't be empty.`), null];
        if (property !== undefined && !isNaN(+property)) return [HttpError.badRequest(`${propertyName} not valid.`), null];
        if (!property) return [HttpError.badRequest(`${propertyName} is required.`), null];
        return [null, null];
    }

    static create(object: { [key: string]: any }): [HttpError | null, CreateUserDto | null] {
        const { name, last_name, email, password } = object;
        const resultValidationName = this.basicValidation(name, "Name");
        if (resultValidationName[0] !== null) return resultValidationName;
        const resultValidationLastName = this.basicValidation(last_name, "Last name");
        if (resultValidationLastName[0] !== null) return resultValidationLastName;
        const resultValidationEmail = this.basicValidation(email, "Email");
        if (resultValidationEmail[0] !== null) return resultValidationEmail;
        if (!Regex.email.test(email)) return [HttpError.badRequest("Email not valid."), null]
        const resultValidationPassword = this.basicValidation(password, "Password");
        if (resultValidationPassword[0] !== null) return resultValidationPassword;
        if (!Regex.password.test(password)) return [HttpError.badRequest("Password can't be less than 6 digits long."), null];
        return [null, new CreateUserDto({ name, last_name, email, password })];
    }
}