import { FileSystenDatasource } from "../infraestructure/datasources/file-system.datasouce";
import { MongoDatasource } from "../infraestructure/datasources/mongo.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";
import { PostgresDatasource } from "../infraestructure/datasources/postgres.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/check/check-multiple.use-case";

export class Server {
    public static start = async () => {
        console.log("Server running...");
        const fileSystemlog = new LogRepositoryImplementation(
            new FileSystenDatasource(),
        );
        const mongoLog = new LogRepositoryImplementation(
            new MongoDatasource()
        );
        const postgresLog = new LogRepositoryImplementation(
            new PostgresDatasource()
        );
        const url = "https://googlee.com"
        CronService.createJob("*/5 * * * * *", () => {
            new CheckServiceMultiple(
                [
                    fileSystemlog,
                    mongoLog,
                    postgresLog
                ],
                () => console.log(`${url} is working`),
                (error) => console.log(error)
            ).execute(url);
        });


    }
}