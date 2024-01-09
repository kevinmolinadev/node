import { Status } from "@prisma/client";

interface UpdateDtoOptions {
    id: number,
    title: string,
    status: Status | null,
    completedAt: Date | null,
}

export class UpdateDto {
    public id: number;
    public title: string;
    public status: Status | null;
    public completedAt: Date | null;

    private constructor(options: UpdateDtoOptions) {
        const { id, title, status, completedAt } = options;
        this.id = id;
        this.title = title;
        this.status = status;
        this.completedAt = completedAt;
    }

    get values() {
        const obj: { [key: string]: any } = {};

        if (this.title) obj.title = this.title;
        if (this.status) obj.status = this.status;
        if (this.completedAt) obj.completedAt = this.completedAt;

        return obj;
    }

    private static convertToStatus = (status: string): Status => {
        const statusTodo: { [key: string]: Status } = {
            active: Status.active,
            completed: Status.completed
        }
        return statusTodo[status];
    }

    static create = (object: { [key: string]: any }): [string | null, UpdateDto | null] => {
        const { id, title, status = null, completedAt = null } = object;
        if (title !== undefined && title.length === 0) return ["The title can't a empty.", null];
        let newStatus = status;
        let newCompletedAt = completedAt;
        if (status) {
            if (!(status in Status)) return [`The status ${status} is not a type valid.`, null];
            newStatus = this.convertToStatus(status);
        }
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) return [`CompletedAt is not a valid date.`, null];
        }
        return [null, new UpdateDto({ id, title, status: newStatus, completedAt: newCompletedAt })];
    }
}