import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface EmailSendLogsOptions {
    execute(to: string | string[]): Promise<boolean>,
}

export class EmailSendLogs implements EmailSendLogsOptions {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }
    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sentEmail = this.emailService.sendEmailWithLogsSystem(to);
            if (!sentEmail) throw new Error("Error in sending the system logs");
            const log = new LogEntity({
                message: "Sending of system logs",
                level: LogSeverityLevel.low,
                origin: "email-send-logs.use-case.ts"
            });
            this.logRepository.saveLog(log)
            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: "email-send-logs.use-case.ts"
            });
            this.logRepository.saveLog(log)
            return false;
        }
    }
}