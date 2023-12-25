import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

interface CronJobSevice {
    start(): void,
    stop(): void
}

export class CronService {

    public static createJob(cronTime: CronTime, onTick: OnTick): CronJobSevice {
        const job = new CronJob(cronTime, onTick);
        job.start();
        return {
            start: () => {
                job.start();
            },
            stop: () => {
                job.stop();
            },
        };
    }
}