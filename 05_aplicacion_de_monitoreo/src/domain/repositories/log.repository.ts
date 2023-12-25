import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
    public abstract saveLog(log: LogEntity): Promise<void>;
    public abstract getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]>;
}