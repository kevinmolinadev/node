import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImplementation implements LogRepository {
    constructor(
        private readonly logDatasource: LogDatasource
    ) { }

    public async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }

    public async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(logLevel);
    }
}