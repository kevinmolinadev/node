import { CreateUserDto, IUserDatasource, UserEntity } from "../../domain";

export class AuthService {
    constructor(
        private readonly datasource: IUserDatasource,
    ) { }

    public registerUser(user: CreateUserDto): Promise<UserEntity> {
        //TODO: Hashear password

        //TODO: generate JWT

        //TODO: validate email
        return this.datasource.create(user);
    }
}