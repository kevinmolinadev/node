import { Encryption, Jwt, envs } from "../../config";
import { CreateUserDto, HttpError, IUserDatasource, LoginUserDto } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
    constructor(
        private readonly datasource: IUserDatasource,
        private readonly emailService: EmailService,
    ) { }

    public async validateEmail(token: string) {
        const { email } = Jwt.verify(token) as { email: string };
        if (!email) throw HttpError.unauthorized("Token invalid.");
        const user = await this.datasource.updateEmailValidated(email);
        if (!user) throw HttpError.internalServerError("Error while validated email.")
        return {
            message: `Your email ${email} is validated.`
        }
    }

    private generateToken(payload: any) {
        const token = Jwt.generate(payload);
        if (!token) throw HttpError.internalServerError("error while creating token.");
        return token;
    }

    public async loginUser(user: LoginUserDto) {
        const userEntity = await this.datasource.getByEmail(user.email);
        const isPassword = Encryption.compare(user.password, userEntity.getPassword);
        if (!isPassword) throw HttpError.badRequest("Password incorrect.");
        const token = this.generateToken(userEntity.basicData);
        return {
            user: userEntity.basicData,
            token
        }
    }

    public async registerUser(user: CreateUserDto) {
        const passwordHashed = Encryption.hash(user.password);
        const userRegister = await this.datasource.create({ ...user, password: passwordHashed });
        const token = this.generateToken(userRegister.basicData);
        const isSent = await this.sendValidationEmail(user.email);
        if (!isSent) throw HttpError.internalServerError("Error when sending the validation email ");
        return {
            user: userRegister.data,
            token
        }
    }

    private async sendValidationEmail(email: string) {
        const timeExpired = 10
        const token = Jwt.generate({ email }, `${timeExpired}m`);
        const linkOfValidation = `${envs.WEBSERVICE_URL}/api/v1/auth/validate-email/${token}`;
        const html = `
        <html>
            <body>
                <h1>Validation Email</h1>
                <p>Thank you for registering with our service.</p>
                <p>Please click the following link to validate your email address:</p>
                <a href="${linkOfValidation}" target="_blank">Validate your email</a>
                <p>This link will expire on ${timeExpired} minutes.</p>
                <p>If you didn't register for our service, please ignore this email.</p>
            </body>
        </html>
    `;

        return this.emailService.sendEmail({
            to: email,
            subject: "Validation email",
            html
        })

    }
}