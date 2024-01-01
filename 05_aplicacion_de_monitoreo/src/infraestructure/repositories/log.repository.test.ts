import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImplementation } from "./log.repository";


describe("log.repository.ts", () => {
    const logTest = new LogEntity({
        message: "test message",
        level: LogSeverityLevel.low,
        origin: "log.repository.test.ts"
    })

    const logDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn().mockReturnValue([logTest])
    }
    const LogRepository = new LogRepositoryImplementation(logDatasource);
    afterEach(() => {
        jest.clearAllMocks();
    })

    test("should save a log", () => {
        LogRepository.saveLog(logTest);

        expect(logDatasource.saveLog).toHaveBeenCalledWith(logTest);
        expect(logDatasource.saveLog).toHaveBeenCalledTimes(1);

    });

    test("should get logs by level", async () => {
        const logs = await LogRepository.getLogs(LogSeverityLevel.low);

        expect(logDatasource.getLogs).toHaveBeenCalled();
        expect(logDatasource.getLogs).toHaveBeenCalledTimes(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
})