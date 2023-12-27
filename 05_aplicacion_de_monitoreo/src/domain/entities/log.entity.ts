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
        const options: LogEntityOptions = JSON.parse(json);
        const log = new LogEntity(options);
        return log;
    }
}