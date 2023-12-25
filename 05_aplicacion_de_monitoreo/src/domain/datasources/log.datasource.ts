import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
    public abstract saveLog(log: LogEntity): Promise<void>;
    public abstract getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]>;
}