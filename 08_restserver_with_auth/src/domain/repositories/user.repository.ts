import { CreateUserDto } from "../dtos/user/create.dto";
import { UpdateUserDto } from "../dtos/user/update.dto";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    getAll(): Promise<UserEntity[]>,
    getById(id: string): Promise<UserEntity>,
    create(user: CreateUserDto): Promise<UserEntity>,
    update(user: UpdateUserDto): Promise<UserEntity>,
    delete(id: string): Promise<UserEntity>
}