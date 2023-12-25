import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystenDatasource implements LogDatasource {
    private readonly logPath = "logs/"
    private readonly allPath = "logs/logs-all.log"
    private readonly mediumPath = "logs/logs-medium.log"
    private readonly highPath = "logs/logs-high.log"

    constructor() {
        this.loadFiles();
    }

    private loadFiles() {
        if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath, { recursive: true });
        [
            this.allPath,
            this.mediumPath,
            this.highPath
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const SaveAsJson = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allPath, SaveAsJson);
        if (newLog.level === LogSeverityLevel.low) return;
        switch (newLog.level) {
            case LogSeverityLevel.medium:
                fs.appendFileSync(this.mediumPath, SaveAsJson);
                break;
            case LogSeverityLevel.high:
                fs.appendFileSync(this.highPath, SaveAsJson);
                break;
        }
    }
    private getLogsFromFile(pathFile: string): LogEntity[] {
        const file = fs.readFileSync(pathFile, 'utf-8').trim();
        const logs = file.split("\n").map(log => LogEntity.fromJSON(log));
        return logs;
    }

    async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (logLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highPath);
            default:
                throw new Error(`${logLevel} not implemented.`);
        }
    }
}