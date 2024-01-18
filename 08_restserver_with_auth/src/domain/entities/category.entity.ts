interface Options {
    id: string
    name: string,
    available: boolean,
    user: string
    createdAt: Date,
    updatedAt: Date
}

export class CategoryEntity {
    private readonly id: string
    private readonly name: string
    private readonly available: boolean
    private readonly user: string
    private readonly createdAt: Date
    private readonly updatedAt: Date

    constructor(options: Options) {
        const { id, name, available, user, createdAt, updatedAt } = options;
        this.id = id;
        this.name = name;
        this.available = available;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    static fromObject(object: { [key: string]: any }): CategoryEntity {
        const { _id, name, available, user, created_at, updated_at } = object;
        return new CategoryEntity({ id: _id, name, available, user, createdAt: created_at, updatedAt: updated_at });
    }
}