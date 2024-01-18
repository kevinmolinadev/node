import { CreateUserDto, IUserDatasource, UserEntity } from "../../domain";

export class UserService {
    constructor(
        private readonly datasource: IUserDatasource
    ) { }

    async getAll() {
        const users = await this.datasource.getAll();
        return users.map(user => user.data);
    }

    async add(user: CreateUserDto) {
        const newUser = await this.datasource.create(user)
        const userEntity = UserEntity.fromObject(newUser);
        return {
            
        };
    }

}