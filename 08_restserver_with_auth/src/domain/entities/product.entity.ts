interface Options {
    id: string
    name: string,
    available: boolean,
    price: number,
    user: string
    category: string
    createdAt: Date,
    updatedAt: Date
}

export class ProductEntity {
    private readonly id: string
    private readonly name: string
    private readonly available: boolean
    private readonly price: number
    private readonly user: string
    private readonly category: string
    private readonly createdAt: Date
    private readonly updatedAt: Date

    constructor(options: Options) {
        this.id = options.id;
        this.name = options.name;
        this.available = options.available;
        this.price = options.price;
        this.user = options.user;
        this.category = options.category;
        this.createdAt = options.createdAt;
        this.updatedAt = options.updatedAt;
    }


    static fromObject(object: { [key: string]: any }): ProductEntity {
        const { _id, name, available, price, user, category, created_at, updated_at } = object;
        return new ProductEntity({ id: _id, name, available, price, user, category, createdAt: created_at, updatedAt: updated_at });
    }
}