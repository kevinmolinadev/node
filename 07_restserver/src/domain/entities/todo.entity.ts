export enum Status {
    active = "active",
    completed = "completed"
}

interface TodoEntityOptions {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    status: Status,
    completedAt: Date | null
}

export class TodoEntity {
    private readonly id: number;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private title: string;
    private status: Status;
    private completedAt: Date | null;

    constructor(options: TodoEntityOptions) {
        const { id, createdAt, updatedAt, title, status, completedAt } = options;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.status = status;
        this.completedAt = completedAt;
    }

    static fromObject = (object: { [key: string]: any }): TodoEntity => {
        const { id, createdAt, updatedAt, title, status, completedAt } = object;
        return new TodoEntity({ id, createdAt, updatedAt, title, status, completedAt });
    }
}