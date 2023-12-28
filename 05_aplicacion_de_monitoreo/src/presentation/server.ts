import { CheckService } from "../domain/use-cases/check/check.use-case";
import { EmailSendLogs } from "../domain/use-cases/email/email-send-logs.use-case";
import { FileSystenDatasource } from "../infraestructure/datasources/file-system.datasouce";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

export class Server {
    public static start = () => {
        console.log("Server running...");
        const fileSystem = new LogRepositoryImplementation(new FileSystenDatasource());
        const emailService = new EmailService();
        new EmailSendLogs(
            emailService,
            fileSystem
        ).execute("");
    }
}