import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/check/check.use-case";
import { FileSystenDatasource } from "../infraestructure/datasources/file-system.datasouce";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

export class Server {
    public static start = () => {
        console.log("Server running...");
        //const fileSystem = new LogRepositoryImplementation(new FileSystenDatasource());
        //CronService.createJob('*/5 * * * * *', () => {
        //    const url = "https://see-really.web.app";
        //    new CheckService(
        //        fileSystem,
        //        () => { console.log(`Service of ${url} is ok`) },
        //        (error) => { console.log(error) }
        //    ).execute(url);
        //});
        const emailService = new EmailService();
        emailService.sendEmail({
            to: ["",""],
            subject: "Prueba de envio",
            html: `
                <h1>HOLA A TODOS</h1>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, quos debitis assumenda ea et exercitationem ab, sunt culpa in, similique quasi eius quibusdam iusto! Sapiente illum incidunt voluptatem sed sint?
                <p>HASTA LUEGO KEVIN :D</p>
                `,
            attachments: [
                { file: "logs-all.log",path:"./logs/logs-all.log" },
                { file: "logs-medium.log",path:"./logs/logs-medium.log" },
                { file: "logs-high.log",path:"./logs/logs-high.log" },
            ]
        })
    }
}