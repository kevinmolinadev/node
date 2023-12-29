export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

interface LogEntityOptions {
    level: LogSeverityLevel
    message: string
    createdAt?: Date
    origin: string
}
export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJSON(json: string): LogEntity {
        const options = JSON.parse(json);
        return new LogEntity(options);;
    }

    static fromObject(objet: { [key: string]: any }): LogEntity {
        const { message, level, origin, createdAt } = objet;
        return new LogEntity({
            message,
            level,
            origin,
            createdAt,
        });
    }
}