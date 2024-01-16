interface Options {
    id: string,
    name: string,
    lastName: string
    email: string,
    emailValidated: boolean,
    password: string,
    img: string | null,
    role: string[]
    createdAt: Date,
    updatedAt: Date
}

export class UserEntity {
    private readonly id: string
    private readonly name: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly emailValidated: boolean;
    private readonly password: string;
    private readonly img: string | null;
    private readonly role: string[];
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    constructor(options: Options) {
        const { id, name, lastName, email, emailValidated, password, img, role, createdAt, updatedAt } = options;
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.emailValidated = emailValidated;
        this.password = password;
        this.img = img;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject(object: { [key: string]: any }): UserEntity {
        const { _id, name, lastName, email, email_validated, password, img, role, created_at, updated_at } = object;
        return new UserEntity({ id: _id, name, lastName, email, emailValidated: email_validated, password, img, role, createdAt: created_at, updatedAt: updated_at });
    }
}