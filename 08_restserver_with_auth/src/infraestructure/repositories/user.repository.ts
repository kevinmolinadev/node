import { CreateUserDto, IUserDatasource, IUserRepository, UpdateUserDto, UserEntity } from "../../domain";

export class UserRepository implements IUserRepository {

    constructor(
        private readonly datasource: IUserDatasource
    ) { }

    getAll(): Promise<UserEntity[]> {
        return this.datasource.getAll();
    }
    getById(id: string): Promise<UserEntity> {
        return this.datasource.getById(id);
    }
    create(user: CreateUserDto): Promise<UserEntity> {
        return this.datasource.create(user);
    }
    update(user: UpdateUserDto): Promise<UserEntity> {
        return this.datasource.update(user);
    }
    delete(id: string): Promise<UserEntity> {
        return this.datasource.delete(id);
    }

}