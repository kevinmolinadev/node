import { Regex } from "../../../config";
import { HttpError } from "../../erros/http.error";

interface Options {
    email: string
    password: string
}
export class LoginUserDto {
    public readonly email: string
    public readonly password: string
    constructor(options: Options) {
        const { email, password } = options;
        this.email = email
        this.password = password
    }

    private static basicValidation(property: any, propertyName: string): [HttpError | null, LoginUserDto | null] {
        if (property !== undefined && property.length === 0) return [HttpError.badRequest(`${propertyName} can't be empty.`), null];
        if (property !== undefined && !isNaN(+property)) return [HttpError.badRequest(`${propertyName} not valid.`), null];
        if (!property) return [HttpError.badRequest(`${propertyName} is required.`), null];
        return [null, null];
    }
    static create(object: { [key: string]: any }): [HttpError | null, LoginUserDto | null] {
        const { email, password } = object;
        const resultValidationEmail = this.basicValidation(email, "Email");
        if (resultValidationEmail[0] !== null) return resultValidationEmail;
        if (!Regex.email.test(email)) return [HttpError.badRequest("Email not valid."), null]
        const resultValidationPassword = this.basicValidation(password, "Password");
        if (resultValidationPassword[0] !== null) return resultValidationPassword;
        if (!Regex.password.test(password)) return [HttpError.badRequest("Password can't be less than 6 digits long."), null];
        return [null, new LoginUserDto({ email, password })];
    }
}