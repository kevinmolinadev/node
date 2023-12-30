/* import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
    public abstract saveLog(log: LogEntity): Promise<void>;
    public abstract getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]>;
} */

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe("log.datasource.ts", () => {
    const log = new LogEntity({
        message: "Test message",
        level: LogSeverityLevel.low,
        origin: "log.datasource.test.ts"
    });
    class LogDatasoruceTest implements LogDatasource {
        public async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        public async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log];
        }

    }
    test("should save a log", async () => {
        const logDatasource = new LogDatasoruceTest();
        const saveLogMock = jest.spyOn(logDatasource, "saveLog");

        await logDatasource.saveLog(log);

        expect(saveLogMock).toHaveBeenCalled();
        expect(saveLogMock).toHaveBeenCalledWith(log);
    });

    test("should return a logs by level severity", async () => {
        const logDatasource = new LogDatasoruceTest();

        const logs = await logDatasource.getLogs(LogSeverityLevel.low);

        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
})