import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/check/check.use-case";
import { FileSystenDatasource } from "../infraestructure/datasources/file-system.datasouce";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";

export class Server {
    public static start = () => {
        console.log("Server running...");
        const fileSystem = new LogRepositoryImplementation(new FileSystenDatasource());
        CronService.createJob('*/5 * * * * *', () => {
            const url = "https://see-really.web.app";
            new CheckService(
                fileSystem,
                () => { console.log(`Service of ${url} is ok`) },
                (error) => { console.log(error) }
            ).execute(url);
        });

    }
}