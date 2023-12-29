import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceMultipleOptions {
    execute(url: string): Promise<boolean>
}

type SuccessCallBack = () => void
type ErrorCallback = (error: string) => void

export class CheckServiceMultiple implements CheckServiceMultipleOptions {
    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallBack?: SuccessCallBack,
        private readonly errorCallBack?: ErrorCallback,
    ) { }

    private callLogsRepository(log: LogEntity) {
        this.logRepositories.forEach(repository => repository.saveLog(log));
    }

    public async execute(url: string) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error on check service ${url}`)
            const log = new LogEntity({
                message: `${url} is working`,
                level: LogSeverityLevel.low,
                origin: "src/domain/use-cases/check/check.use-case.ts"
            });
            this.callLogsRepository(log);
            this.successCallBack && this.successCallBack();
            return true
        } catch (error) {
            const errorMessage = `${url} ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: "src/domain/use-cases/check/check.use-case.ts"
            });
            this.callLogsRepository(log);
            this.errorCallBack && this.errorCallBack(errorMessage);
            return false
        }
    }
}