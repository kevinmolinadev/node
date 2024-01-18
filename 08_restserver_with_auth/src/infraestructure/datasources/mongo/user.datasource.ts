import { UserModel } from "../../../data";
import { CreateUserDto, HttpError, IUserDatasource, UpdateUserDto, UserEntity } from "../../../domain";

export class UserMongo implements IUserDatasource {

    private async verifyThatEmailExists(email: string) {
        const emailExists = await UserModel.findOne({ email });
        if (emailExists) throw HttpError.badRequest(`Email alredy exist.`)
    }

    private async verifyThatEmailNotExists(email: string) {
        const emailExists = await UserModel.findOne({ email });
        if (!emailExists) throw HttpError.notFound(`User with email ${email} not found.`);
    }

    async getAll(): Promise<UserEntity[]> {
        const users = await UserModel.find({});
        return users.map(UserEntity.fromObject);
    }

    async getById(id: string): Promise<UserEntity> {
        const user = await UserModel.findById(id);
        if (!user) throw HttpError.notFound(`User with id ${id} not found.`);
        return UserEntity.fromObject(user);
    }

    async getByEmail(email: string): Promise<UserEntity> {
        await this.verifyThatEmailNotExists(email);
        const user = await UserModel.findOne({ email });
        return UserEntity.fromObject(user!);
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        await this.verifyThatEmailExists(user.email);
        const newUser = await UserModel.create(user);
        return UserEntity.fromObject(newUser);
    }
    async update(user: UpdateUserDto): Promise<UserEntity> {
        await this.getById(user.id);
        const updateUser = await UserModel.updateOne({ _id: user.id }, user.getValues)
        return UserEntity.fromObject(updateUser);
    } 

    async updateEmailValidated(email: string): Promise<boolean> {
        await this.verifyThatEmailNotExists(email);
        await UserModel.updateOne({ email }, {
            email_validated: true
        })
        return true;
    }

    async delete(id: string): Promise<UserEntity> {
        await this.getById(id);
        const user = await UserModel.deleteOne({ _id: id });
        return UserEntity.fromObject(user);
    }




}