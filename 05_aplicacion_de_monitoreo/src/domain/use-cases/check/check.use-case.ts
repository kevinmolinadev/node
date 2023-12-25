import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceOptions {
    execute(url: string): Promise<boolean>
}

type SuccessCallBack = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceOptions {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack?: SuccessCallBack,
        private readonly errorCallBack?: ErrorCallback,
    ) { }

    public async execute(url: string) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error on check service ${url}`)
            const log = new LogEntity(`${url} is working`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            this.successCallBack && this.successCallBack();
            return true
        } catch (error) {
            const errorMessage = `${url} ${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.high);
            this.logRepository.saveLog(log);
            this.errorCallBack && this.errorCallBack(errorMessage);
            return false
        }
    }
}