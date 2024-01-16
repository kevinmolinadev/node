import { Encryption, Jwt } from "../../config";
import { CreateUserDto, HttpError, IUserDatasource, LoginUserDto } from "../../domain";

export class AuthService {
    constructor(
        private readonly datasource: IUserDatasource,
    ) { }

    public async validateEmail(token: string) {
        return Jwt.verify(token);
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
        //TODO: validate email
        return {
            user: userRegister.data,
            token
        }
    }
}