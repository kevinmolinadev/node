import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client'

const prisma = new PrismaClient();

const severityLevel = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresDatasource implements LogDatasource {

    public async saveLog(log: LogEntity): Promise<void> {
        const level = severityLevel[log.level];
        try {
            await prisma.logPostgresModel.create({
                data: { ...log, level }
            });
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
        try {
            const level = severityLevel[logLevel];
            const logsPostgres = await prisma.logPostgresModel.findMany({
                where: {
                    level
                }
            })
            return logsPostgres.map(LogEntity.fromObject);
        } catch (error) {
            return [];
        }
    }

}