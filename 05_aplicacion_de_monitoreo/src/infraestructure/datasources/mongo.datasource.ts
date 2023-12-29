import { LogMongoModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoDatasource implements LogDatasource {
    public async saveLog(log: LogEntity): Promise<void> {
        await LogMongoModel.create(log);
    }
    public async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logsMongo = await LogMongoModel.find({ level: logLevel });
        return logsMongo.map(LogEntity.fromObject);
    }

}