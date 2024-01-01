import { CronService } from './cron.service';

describe("cron.service.ts", () => {
    const tickMock = jest.fn();
    test("should called  createJob  with successfull", (done) => {
        const job = CronService.createJob("* * * * * * ", tickMock);

        setTimeout(() => {
            expect(tickMock).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000)
    });
})